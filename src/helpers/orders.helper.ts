// "BT4" from "BT4 1AA"
export const extractOfaPostCode = (postcode: string) => {
  if (postcode?.includes(" ")) {
    return postcode.split(" ")[0];
  }
  return postcode;
};

// filters the orders data and returns the required data to store in db
// only use when importing from selro ** muliplies weight by 1000 to convert to grams
const extractOrdersData = (orders: any) => {
  return orders.map((order: any) => ({
    selroOrderId: order.id,
    id: order.orderId,
    date: order.purchaseDate,
    channel: order.channel,
    selroChannelName: order.selroChannelName,
    site: order.site,
    totalPrice: order.totalPrice,
    trackingNumber: order.trackingNumber,
    carrierName: order.carrierName,
    shippingMethod: order.shippingMethod,
    shipmentServiceLevelCategory: order.shipmentServiceLevelCategory,
    shipServiceLevel: order.shipServiceLevel,
    shipCountry: order.shipCountry,
    // mixed array of orders
    channelSales: order.channelSales.map((channelSale: any) => ({
      id: channelSale.id,
      cahnnelOrderId: channelSale.channelOrderId,
      orderId: channelSale.orderId,
      channel: channelSale.channel,
      sku: channelSale.sku,
      inventorysku: channelSale.inventorysku,
      ean: channelSale.ean,
      orderStatus: channelSale.orderStatus,
      weight: channelSale.weight,
      itemPrice: channelSale.itemPrice,
      subTotal: channelSale.subTotal,
      totalPrice: channelSale.totalPrice,
      shippingPrice: channelSale.shippingPrice,
      shippingTax: channelSale.shippingTax,
      shippingDiscount: channelSale.shippingDiscount,
      itemTax: channelSale.itemTax,
      buyerEmail: channelSale.buyerEmail,
      shipCountry: channelSale.shipCountry,
      trackingNumber: channelSale.trackingNumber,
      shipPostalCode: channelSale.shipPostalCode,
      ofaPostCode: extractOfaPostCode(channelSale.shipPostalCode),
      shippingMethod: channelSale.shippingMethod,
      bundleskus: channelSale.bundleskus,
      height: channelSale.height,
      width: channelSale.width,
      length: channelSale.length,
      customItemTitle: channelSale.customItemTitle,
      inventoryTitle: channelSale.inventoryTitle,
      ioss: channelSale.ioss,
      weightGrams: channelSale.weightGrams,
      weightKg: channelSale.weightKg,
      orderIdList: channelSale.orderIdList,
      barcode: channelSale.barcode,
      shippingMethodShort: channelSale.shippingMethodShort,
      inventoryskuvalue: channelSale.inventoryskuvalue,
      shortenSku: channelSale.shortenSku,
    })),
    channelSalesLength: order.channelSales.length,

    currencyName: order.currencyName,
    shipPostalCode: order.shipPostalCode,
    totalWeight: order.totalWeight,
    currencyCode: order.currencyCode,
    fulfillmentChannel: order.fulfillmentChannel,
  }));
};

// Fetch orders for a specific channel
async function importOrdersForChannel(
  from: string,
  to: string,
  channelId: string
): Promise<any[]> {
  const url = `${process.env.SELRO_API_ENDPOINT}/orders?secret=${process.env.SELRO_API_SECRET}&key=${process.env.SELRO_API_KEY}&from_date=${from}&to_date=${to}&channel_id=${channelId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch orders for channel ${channelId}`);
  }

  const data = (await response.json()) as any;
  return data.orders as any[];
}

// Fetch orders from a list of channel IDs in a given date range
export const importOrders = async (
  from: string,
  to: string,
  channelIds: string[]
) => {
  try {
    // Fetch orders for each channel ID
    const fetchPromises = channelIds.map((channelId: string) =>
      importOrdersForChannel(from, to, channelId)
    );

    const ordersResults = await Promise.all(fetchPromises);

    // Flatten the array of order arrays
    const allOrders = ordersResults.flat();

    // Store orders in database
    const extractedOrdersData = extractOrdersData(allOrders);
    return { orders: extractedOrdersData, error: null };
  } catch (error: any) {
    return { orders: [], error: error.message };
  }
};
