export type OrderProductProps = {
  productId: string
  name: string
  description: string
  price: number
  endedAt: Date | null
  startedAt: Date | null
  autoRenewed: boolean
  options?: {
    quantity?: number
    currencyId?: string
    currencyPrice?: number
  }
}
export type OrderDiscountProps = {
  name: string
  type: string | null
  target: string | null
  description: string | null
  price: number
  options: { [key: string]: any } | null
}
export type ShippingOptionProps = {
  id: string
  fee: number
  days: number
  enabled: boolean
}
export type CheckProps = {
  orderProducts: OrderProductProps[]
  orderDiscounts: OrderDiscountProps[]
  shippingOption: ShippingOptionProps | null
}
export type CouponProps = {
  id: string
  status: {
    used: boolean
    outdated: boolean
  }
  couponCode: {
    code: string
    couponPlan: {
      id: string
      startedAt: Date | null
      endedAt: Date | null
      type: 'cash' | 'percent'
      constraint: number
      amount: number
      title: string
      description: string | null
      count: number
      remaining: number
      scope: string[] | null
      productIds?: string[]
    }
  }
}
