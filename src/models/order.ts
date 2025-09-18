export enum EStatusItemSize {
  MS = 'M',
  LS = 'L',
  XL = 'XL'
}

export interface IOrderItem {
  itemId: string
  size: EStatusItemSize
  quantity: number
}

export interface IOrderItemCreate {
  userId: string
  items: IOrderItem[]
  voucherCode: string
}

export interface IItem {
  _id: string
  categoryId: string
  description: string
  images: string[]
  name: string
  price: string
}

export interface IOrderItemV2 {
  _id: string
  size: EStatusItemSize
  quantity: number
  price: number
  itemId: IItem
}

export interface IOrder {
  _id: string
  discount: number
  email: string
  finalTotal: number
  fullName: string
  status: string /////////////////////////////////// TEST
  totalPrice: string
  userId: string
  createdAt: string
  updatedAt: string
  orderItems: IOrderItemV2[]
}

export interface IOrderDetailItem {
  itemDetail: IItem
  itemId: string
  orderId: string
  price: number
  quantity: number
  size: EStatusItemSize
  _id: string
}

export interface IOrderDetail {
  _id: string
  discount: number
  email: string
  finalTotal: number
  fullName: string
  status: string /////////////////////////////////// TEST
  totalPrice: string
  userId: string
  createdAt: string
  code: string
  updatedAt: string
  items: IOrderDetailItem[]
}
