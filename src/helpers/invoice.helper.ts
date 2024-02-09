import { ICarrier } from "../models/carrier.model";
import { Fee, IFee } from "../models/fees.model";
import { IInvoice, IItem } from "../models/invoice.model";
import { Item } from "../models/item.model";
import { PostCode } from "../models/postcode.model";
import {
  retrieveItemWithSku,
  retrieveMissingItemWeight,
} from "../services/items.service";
import { extractOfaPostCode } from "./orders.helper";

const shipping_weight_groups = [
  100, 250, 500, 750, 1000, 2000, 3000, 5000, 10000, 15000, 17000, 30000,
];
const handling_weight_groups = [15000, 23000, 30000];

const packagingFees: any = {
  A: {
    "15000": 0.1,
    "23000": 0.1,
    "30000": 0.1,
  },
  B: {
    "15000": 0.45,
    "23000": 0.65,
    "30000": 0.85,
  },
  C: {
    "15000": 0.9,
    "23000": 1.25,
    "30000": 1.5,
  },
  D: {
    "15000": 1.99,
    "23000": 2.99,
    "30000": 3.99,
  },
};

const findShippingWeightGroup = (weight: number) =>
  shipping_weight_groups.find((group) => weight <= group) ||
  shipping_weight_groups[shipping_weight_groups.length - 1];

const findHandlingWeightGroup = (weight: number) =>
  handling_weight_groups.find((group) => weight <= group) ||
  handling_weight_groups[handling_weight_groups.length - 1];

const getItemsWeights = async (items: any[]): Promise<IItem[]> => {
  const itemsWeightGroups = await Promise.all(
    items.map(async (item) => {
      const itemData = await retrieveItemWithSku(item.sku);

      const weight = (itemData?.weight || item.weight || 0) * 1000; // Consolidate weight calculation
      const itemClass = itemData?.class || "A";

      return {
        sku: item.sku,
        weight,
        shippingWeightGroup: findShippingWeightGroup(weight),
        handlingWeightGroup: findHandlingWeightGroup(weight),
        itemClass,
      };
    })
  );

  return itemsWeightGroups;
};

const getOrderWeights = (
  totalWeight: number | undefined,
  itemsWeightGroups: IItem[]
) => {
  const weight = (totalWeight || 0) * 1000;
  if (weight) {
    return {
      weight: weight,
      shippingWeightGroup: findShippingWeightGroup(weight),
      handlingWeightGroup: findHandlingWeightGroup(weight),
    };
  } else {
    let totalWeight = 0;
    for (const item of itemsWeightGroups) {
      // this weight has been already converted to kg
      totalWeight += item.weight;
    }
    return {
      weight: totalWeight,
      shippingWeightGroup: findShippingWeightGroup(totalWeight),
      handlingWeightGroup: findHandlingWeightGroup(totalWeight),
    };
  }
};
const handleUnwantedOrders = (orders_raw: any[]) => {
  return orders_raw.filter((order) => {
    if (!order.trackingNumber) return false;
    if (order.channelSales[0].orderStatus === "Cancelled") return false;
    return true;
  });
};

const getOrderService = (order: any, carriers: ICarrier[]) => {
  const carrier = carriers.find((c) => c.name === order.carrierName);
  if (!carrier) return undefined;

  const orderShippingMethod = order.shippingMethod;
  if (!orderShippingMethod) return undefined;

  const orderService = orderShippingMethod.includes("|")
    ? orderShippingMethod.split("|")[1]
    : orderShippingMethod;

  const service = carrier.services.find(
    (s) => s.name.toLowerCase() === orderService.toLowerCase()
  );
  return { carrier, service };
};

type InvoiceByOrder = Record<
  string,
  {
    items: IItem[];
    orderWeightGroup: number;
    orderWeight: number;
    carrier: string;
    service: string;
    shippingCharge: number;
    postage: number;
    handling: number;
    addionalHandling: number;
    surge: number;
    packaging: number;
  }
>;
export const calculateInvoiceByOrder = async (
  orders_raw: any[],
  carriers: ICarrier[]
) => {
  const orders = handleUnwantedOrders(orders_raw);
  const invoiceByOrder: InvoiceByOrder = {};

  const ordersOfaPostCodes = orders.map((order) =>
    extractOfaPostCode(order.postalCode)
  );
  const postCodes = await PostCode.find({
    name: { $in: ordersOfaPostCodes },
  });

  const handlingFees = (await Fee.find({})) as any;

  for (const order of orders) {
    const itemsWeight = await getItemsWeights(order.channelSales);

    const orderWeight = getOrderWeights(order.totalWeight, itemsWeight);

    const shipping = getOrderService(order, carriers) as any;
    if (!shipping || !shipping.service) continue;

    const shippingCharge =
      shipping.service?.charges[orderWeight.shippingWeightGroup] || 0;

    const ofaPostCode = extractOfaPostCode(order.postalCode);
    const postage = postCodes.find((p) => p.name === ofaPostCode)?.amount || 0;

    const handling =
      handlingFees[0].handling[orderWeight.handlingWeightGroup] || 0;

    const isThereAddionalHandling = itemsWeight.length > 1;
    let addionalHandling = 0;
    let packaging = 0;

    for (const item of itemsWeight) {
      console.log("this", item.itemClass, item.handlingWeightGroup, "====<<<");
      if (isThereAddionalHandling) {
        addionalHandling +=
          handlingFees[0].addionalHandling[item.handlingWeightGroup] || 0;
      }
      packaging += packagingFees[item.itemClass][item.handlingWeightGroup] || 0;
    }

    invoiceByOrder[order.id] = {
      items: itemsWeight,
      orderWeightGroup: orderWeight.shippingWeightGroup,
      orderWeight: orderWeight.weight,
      carrier: shipping.carrier.name,
      service: shipping.service.name,
      shippingCharge,
      postage,
      handling,
      addionalHandling,
      surge: 0,
      packaging,
    };
  }

  return invoiceByOrder;
};

type InvoiceByService = Record<
  string,
  {
    carrier: string;
    service: string;
    shipping: number;
    surge: number;
    handling: number;
    packaging: number;
    total: number;
  }
>;
export const calculateInvoice = async (invoiceByOrder: InvoiceByOrder): Promise<InvoiceByService> => {
  const invoiceByService: InvoiceByService = {};

  Object.values(invoiceByOrder).forEach((invoice) => {
    const {
      carrier,
      service,
      shippingCharge,
      handling,
      surge,
      postage,
      addionalHandling,
      packaging,
    } = invoice;

    // Combine carrier and service for a unique key
    const key = `${carrier}-${service}`;

    // Initialize the carrier-service combination if it doesn't exist
    if (!invoiceByService[key]) {
      invoiceByService[key] = {
        carrier,
        service,
        shipping: 0,
        surge: 0,
        handling: 0,
        packaging: 0,
        total: 0,
      };
    }

    // Aggregate charges
    invoiceByService[key].shipping += shippingCharge + postage;
    invoiceByService[key].surge += surge;
    invoiceByService[key].handling += handling + addionalHandling;
    invoiceByService[key].packaging += packaging;

    // Calculate the total for the carrier-service combination
    invoiceByService[key].total += shippingCharge + postage + surge + handling + addionalHandling + packaging;
  });

  return invoiceByService;
};