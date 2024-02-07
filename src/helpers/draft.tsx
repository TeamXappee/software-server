
// //
// import { ICarrier } from "../models/carrier.model";
// import { retrieveMissingItemWeight } from "../services/items.service";

// const shipping_weight_groups = [
//   100, 250, 500, 750, 1000, 2000, 3000, 5000, 10000, 15000, 17000, 30000,
// ];

// const handling_weight_groups = [15000, 23000, 30000];

// const handleUndefinedWeight = async (items?: any[], sku?: any) => {
//   if (sku)
//     return { sku: sku, weightGroup: await retrieveMissingItemWeight(sku) };
//   let itemsWeightGroups: { sku: string; weightGroup: number }[] = [];
//   if (items) {
//     items.map(async (item: any) => {
//       const weightGroup = await retrieveMissingItemWeight(item.sku);
//       itemsWeightGroups.push({ sku: item.sku, weightGroup });
//     });
//     return itemsWeightGroups;
//   }
// };

// const getItemsShippingWeightGroupFor = async (items: any[]) => {
//   let itemsWeightGroups: { sku: string; weightGroup: number }[] = [];
//   items.forEach(async (item) => {
//     if (item.weight) {
//       itemsWeightGroups.push({
//         sku: item.sku,
//         weightGroup:
//           shipping_weight_groups.find((group) => item.weight <= group) ||
//           shipping_weight_groups[shipping_weight_groups.length - 1],
//       });
//     } else {
//       const weight = await retrieveMissingItemWeight(item.sku);
//       itemsWeightGroups.push({
//         sku: item.sku,
//         weightGroup:
//           shipping_weight_groups.find((group) => weight <= group) ||
//           shipping_weight_groups[shipping_weight_groups.length - 1],
//       });
//     }
//   });
//   return itemsWeightGroups;
// };

// const getOrderShippingWeightGroup = async (
//   order: any,
//   itemsWeightGroups: { sku: string; weightGroup: number }[]
// ) => {
//   const weight = order.totalWeight * 1000;
//   if (weight) {
//     return (
//       shipping_weight_groups.find((group) => weight <= group) ||
//       shipping_weight_groups[shipping_weight_groups.length - 1]
//     );
//   } else {
//     let totalWeight = 0;
//     order.channelSales
//   }
// };
// const getHandlingWeightGroup = (weight: number | undefined) =>
//   handling_weight_groups.find((group) => 1500 <= group) ||
//   handling_weight_groups[handling_weight_groups.length - 1];

// const handleUnwantedOrders = (orders_raw: any[]) => {
//   return orders_raw.filter((order) => {
//     if (order.trackingNumber) return true;
//     return false;
//   });
// };

// const getOrderCarrier = (order: any, carriers: ICarrier[]) => {
//   return carriers.find((c) => c.name === order.carrierName);
// };

// const getOrderService = (order: any, carrier: ICarrier) => {
//   const orderShippingMethod = order.shippingMethod;
//   if (!orderShippingMethod) return undefined;

//   const orderService = orderShippingMethod.includes("|")
//     ? orderShippingMethod.split("|")[1]
//     : orderShippingMethod;

//   return carrier.services.find(
//     (s) => s.name.toLowerCase() === orderService.toLowerCase()
//   );
// };

// export const calculateInvoice = async (
//   orders_raw: any[],
//   carriers: ICarrier[]
// ) => {
//   const orders = handleUnwantedOrders(orders_raw);
//   const invoiceByOrder: any = [];

//   for (const order of orders) {
//     const itemsWeightGroups = await getItemsShippingWeightGroupFor(
//       order.channelSales
//     );

//     const carrier = getOrderCarrier(orders, carriers);
//     if (!carrier) return;

//     const service = getOrderService(order, carrier);
//     if (!service) return;

//     const orderWeightGroup = getOrderShippingWeightGroup(
//       order,
//       itemsWeightGroups
//     );
//     const charge = service.charges;
//   }
// };
