import { ICarrier } from "../models/carrier.model";
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

export const calculateInvoice = async (orders: any[], carriers: ICarrier[]) => {
  const carrierFeesMap: Record<string, number> = {};
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
    const carrier = carriers.find((c) => c.name === order.carrierName);
    if (!carrier) {
      addMissedOrder(order.id, "Carrier mismatch");
      continue;
    }

    const weightGroup = getOrderWeightGroup(order.totalWeight) as weightGroup;
    if (!weightGroup) {
      addMissedOrder(
        order.id,
        `Missing weight ${generateCsvFromSkus(order.channelSales)}`
      );
      continue;
    }

    const orderService = order.shippingMethod.includes("|")
      ? order.shippingMethod.split("|")[1]
      : order.shippingMethod;

    const service = carrier.services.find((s) => s.name === orderService);

    if (!service || !service.charges[weightGroup]) {
      addMissedOrder(
        order.id,
        `Service or charge mismatch for ${orderService} (${weightGroup}), ${carrier.name}`
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
      carrierFeesMap[service.name] =
        (carrierFeesMap[service.name] || 0) + Number(charge);
      continue;
    }

    const sum = Number(postcode.amount) + Number(charge);
    carrierFeesMap[service.name] = (carrierFeesMap[service.name] || 0) + sum;
  }

  return { carrierFeesMap, missedOrders };
};

const generateCsvFromSkus = (sales: any) => {
  // Start with a CSV header
  let csvString = "SKU\n";

  // Append each SKU to the CSV string
  sales.forEach((sale: any) => {
    csvString += `${sale.sku}\n`;
  });

  return csvString;
};
