import { TOrderDetails } from "../models/order.modal";

export const calculateOrdersInvoice = async (orderDetails: TOrderDetails[]) => {
  const invoice: any = {};

  for (const order of orderDetails) {
    const {
      PACKAGING,
      TOTAL_HANDLING,
      TOTAL_POSTAGE_COST,
      SERVICE,
      SHIPPING_CARRIER,
      SHIPMENTS,
      FUEL_SURGE,
      SHIPPING_METHOD,
    } = order;

    if (!SERVICE && !SHIPPING_METHOD) {
      console.error("Order missing service:", order);
      continue; // Skip orders with no service defined
    }

    const service = SERVICE || SHIPPING_METHOD;

    const carrier = SHIPPING_CARRIER;

    if (!invoice[service]) {
      invoice[service] = {
        SHIPPING_CARRIER: carrier,
        SHIPMENTS: 0,
        TOTAL_POSTAGE_COST: 0,
        FUEL_SURGE: 0,
        TOTAL_HANDLING: 0,
        PACKAGING: 0,
        SUBTOTAL: 0,
      };
    }

    invoice[service].SHIPMENTS += safelyParseFloat(SHIPMENTS);
    invoice[service].TOTAL_POSTAGE_COST += safelyParseFloat(TOTAL_POSTAGE_COST);
    invoice[service].FUEL_SURGE += safelyParseFloat(FUEL_SURGE);
    invoice[service].TOTAL_HANDLING += safelyParseFloat(TOTAL_HANDLING);
    invoice[service].PACKAGING += safelyParseFloat(PACKAGING);
    invoice[service].SUBTOTAL =
      invoice[service].TOTAL_POSTAGE_COST +
      invoice[service].FUEL_SURGE +
      invoice[service].TOTAL_HANDLING +
      invoice[service].PACKAGING;
  }

  console.log("Calculated Invoice:", invoice);
};

function safelyParseFloat(value: any) {
  const number = parseFloat(value);
  return isNaN(number) ? 0 : number; // Return 0 if the value is not a valid number
}
