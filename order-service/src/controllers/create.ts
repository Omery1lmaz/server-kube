import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Seller } from "../models/seller";
import handleCheckOrderProducts from "../utils/order/checkOrderProduct";
import handleCheckOrderDiscount from "../utils/order/checkOrderDiscount";
import { Table } from "../models/table";
import { Order } from "../models/order";
import { Tip } from "../models/tip";
const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    products,
    name,
    shippingAddress,
    orderMessage,
    totalPrice,
    isTakeAway,
    discount,
    tip,
  } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(400).json({ message: "Please login first" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY!);
    const seller = await Seller.findById(products[0].seller);
    if (!seller || !seller.isWorking) {
      res.status(404).json({
        message: "The restaurant is not available for orders at the moment",
        success: false,
        error: true,
      });
      return;
    }

    // Ürünleri kontrol et
    const checkProducts = await handleCheckOrderProducts(products);
    if (!checkProducts.success) {
      res.status(400).json({ message: "Invalid order products" });
      return;
    }
    if (!checkProducts) {
      res.status(400).json({ message: "Invalid order products" });
      return;
    }
    // İndirim kontrolü
    let discountInfo = null;
    if (discount && discount._id) {
      const checkedDiscount = await handleCheckOrderDiscount({
        discountId: discount._id,
        sellerId: products[0].seller,
        orderAmount: checkProducts.totalPrice,
        userId: decodedToken.id,
      });
      if (checkedDiscount.success) {
        discountInfo = {
          promotion: {
            name: checkedDiscount.discountName,
            amount: checkedDiscount.discountAmount,
            totalAmount:
              checkProducts!!.totalPrice!! - checkedDiscount.discountAmount!!,
            promotionId: checkedDiscount.promotionId,
          },
        };
      }
    }

    // Masa bilgisi al
    const table = isTakeAway ? null : await Table.findById(shippingAddress);

    // Eşsiz sipariş numarası oluştur
    let orderNo: string = "";
    let isUnique = false;
    while (!isUnique) {
      const randomOrderNo = Math.floor(
        100000000 + Math.random() * 900000000
      ).toString();
      if (!(await Order.findOne({ orderNo: randomOrderNo }))) {
        isUnique = true;
        orderNo = randomOrderNo;
      }
    }

    // Bahşiş oluştur
    let tipDocument = null;
    if (tip?.cost >= 1) {
      tipDocument = await Tip.create({
        tip: tip.cost,
        seller: products[0].seller,
      });
    }
    if (orderNo.length < 1) {
      return;
    }
    // Sipariş oluştur
    const newOrder = new Order({
      items: products,
      seller: products[0].seller,
      user: decodedToken.id,
      name,
      orderNo,
      sellerDetails: {
        name: seller.name,
        storeName: seller.storeName,
        _id: seller._id,
        address: seller.address,
        location: seller.location,
        imageUrl: seller.imageUrl,
      },
      shippingAddress: table ? { tableId: table._id, name: table.name } : null,
      orderMessage: orderMessage || null,
      totalPrice: discountInfo
        ? checkProducts.totalPrice!! - discountInfo.promotion.amount!!
        : checkProducts.totalPrice,
      totalAmount: discountInfo
        ? checkProducts.totalPrice!! - discountInfo.promotion.amount!!
        : checkProducts.totalPrice,
      takeAway: isTakeAway,
      discount: discountInfo,
      tip: tipDocument ? tipDocument._id : null,
    });

    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(400).json({ message: "Order creation failed" });
  }
};

export default createOrderController;
