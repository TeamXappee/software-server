import { ICarrier } from "../models/carrier.model";
import { retrieveMissingOrderWeight } from "../services/items.service";
import { retrievePostCode } from "../services/postcodes.service";
import { extractOfaPostCode } from "./orders.helper";

type weightGroup =
  | 100
  | 250
  | 500
  | 750
  | 1000
  | 2000
  | 3000
  | 5000
  | 10000
  | 15000
  | 17000
  | 30000;

const WEIGHT_GROUPS = [
  100, 250, 500, 750, 1000, 2000, 3000, 5000, 10000, 15000, 17000, 30000,
];

const getOrderWeightGroup = (totalWeight?: number) =>
  totalWeight
    ? WEIGHT_GROUPS.find((group) => totalWeight <= group) ||
      WEIGHT_GROUPS.at(-1)
    : undefined;

export const handleWeightGroup = async (order: any) => {
  let weight = order.totalWeight * 1000;
  if (!weight) {
    weight = await retrieveMissingOrderWeight(order);
  }

  return getOrderWeightGroup(weight) as weightGroup;
};

export const calculateInvoice = async (
  orders_raw: any[],
  carriers: ICarrier[]
) => {
  const orders = orders_raw.filter((order) => {
    if (order.trackingNumber) {
      return true;
    } else {
      return false;
    }
  });
  const carrierFeesMap: Record<string, { postage: number; handeling: number }> =
    {};
  const invoiceByOrder: Record<string, number> = {};

  const missedOrders: { id: string; reasons: string[] }[] = [];

  const addMissedOrder = (id: string, reason: string) => {
    const missedOrder = missedOrders.find((order) => order.id === id);
    if (missedOrder) {
      missedOrder.reasons.push(reason);
    } else {
      missedOrders.push({ id, reasons: [reason] });
    }
  };

  for (const order of orders) {
    console.log(order.id, order.shippingMethod, order.carrierName);

    const carrier = carriers.find((c) => c.name === order.carrierName);
    if (!carrier) {
      addMissedOrder(order.id, `Carrier mismatch * ${order.carrierName}`);
      continue;
    }

    const weightGroup = await handleWeightGroup(order);

    const orderService = order.shippingMethod.includes("|")
      ? order.shippingMethod.split("|")[1]
      : order.shippingMethod;

    const service = carrier.services.find((s) => s.name === orderService);
    if (!service || !service.charges[weightGroup]) {
      addMissedOrder(
        order.id,
        `Service or charge mismatch for ${orderService} -wg- (${weightGroup}), ${carrier.name}`
      );
      continue;
    }

    const charge = service.charges[weightGroup];
    const ofaPostcode = extractOfaPostCode(order.shipPostalCode);

    const postcode =
      service.name === "XPECT 48 XL POD 2VLP"
        ? await retrievePostCode(carrier._id, ofaPostcode, service.name)
        : await retrievePostCode(carrier._id, ofaPostcode);

    if (!postcode) {
      //   addMissedOrder(order.id, `Postcode mismatch ${ofaPostcode}`);
      carrierFeesMap[service.name].postage =
        (carrierFeesMap[service.name].postage || 0) + Number(charge);

      invoiceByOrder[order.id] =
        (invoiceByOrder[order.id] || 0) + Number(charge);
      
      continue;
    }

    const sum = Math.ceil(Number(charge) + Number(postcode.amount));

    carrierFeesMap[service.name].postage =
      (carrierFeesMap[service.name].postage || 0) + sum;
    invoiceByOrder[order.id] = (carrierFeesMap[order.id].postage || 0) + sum;
    console.log(
      `${order.id} - ${service.name} - ${charge}, ${order.totalWeight}, wg ${weightGroup}`
    );
  }

  return { carrierFeesMap, missedOrders, invoiceByOrder };
};
