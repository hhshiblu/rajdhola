"use server";
import connectToDB from "@/libs/connect";
import { ObjectId } from "mongodb";

export const createOrder = async (data) => {
  try {
    const db = await connectToDB();
    const productCollection = db.collection("products");
    const orderCollection = db.collection("orders");
    const SellerOrder = db.collection("sellerOrder");
    const adminOrder = db.collection("adminorder");
    const { cart, shippingAddress, userId, paymentInfo } = data;

    const productInfo = await Promise.all(
      cart.map(async (item) => {
        const { productId, quantity } = item;

        const Products = await productCollection.findOne({
          _id: new ObjectId(productId),
        });

        return {
          Products,
          quantity,
          sellerId: Products.sellerId, // Assuming your product model has a "seller" field
          color: item.color,
          size: item.size,
        };
      })
    );

    const Price = productInfo.reduce((acc, item) => {
      const { Products, quantity } = item;

      const productPrice =
        (Products.discountPrice || Products.originalPrice) * quantity;
      return acc + productPrice;
    }, 0);

    const shippingFee = cart?.length * 70;
    const totalPrice = Price + shippingFee;

    const order = {
      products: productInfo,
      userId: userId,
      totalPrice,
      delivery_status: "pending",
      paymentInfo,
      createdAt: new Date(),
    };

    const result = await orderCollection.insertOne(order);

    let unique = [...new Set(productInfo.map((p) => p?.sellerId.toString()))];
    const orderArray = [];

    for (let i = 0; i < unique.length; i++) {
      let price = 0;
      const productsForSeller = [];

      for (let j = 0; j < productInfo.length; j++) {
        const { Products, quantity, sellerId } = productInfo[j];

        if (unique[i] == sellerId.toString()) {
          const productPrice = Products.discountPrice || Products.originalPrice;
          price += productPrice * quantity;
          productsForSeller.push({
            quantity: quantity,
            Products,
          });
        }
      }
      if (productsForSeller.length > 0) {
        orderArray.push({
          orderId: result.insertedId,
          sellerId: unique[i],
          price,
          delivery_status: "pending",
          shippingAddress,
          paymentInfo,
          products: productsForSeller,
          createdAt: new Date(),
        });
      }
    }

    const adminOrders = await adminOrder.insertOne({
      orderId: result.insertedId,
      orderArray: orderArray,
      totalPrice,
      delivery_status: "pending",
      shippingInfo: shippingAddress,
      createdAt: new Date(),
    });
    const sellerOrders = await SellerOrder.insertMany(orderArray);

    if (
      result.acknowledged == true &&
      adminOrders.acknowledged == true &&
      sellerOrders.acknowledged == true
    ) {
      for (const { Products, quantity } of order.products) {
        const stock = Math.max(0, Products.stock - quantity);

        await productCollection.updateOne(
          { _id: Products._id },
          { $set: { stock: stock } }
        );
      }
      return {
        success: true,
        message: "Your Order create successfully",
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
