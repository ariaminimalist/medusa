export type AddressTranslations = {
  shippingAddress: string
  billingAddress: string
  edit: string
  continueToDelivery: string
  contact: string
  sameAddressText: string
  savedAddressGreeting: string
  firstName: string
  lastName: string
  addressLine: string
  company: string
  postalCode: string
  city: string
  stateProvince: string
  billingSameAsShipping: string
  email: string
  phone: string
  validEmail: string
}

export type DeliveryTranslations = {
  heading: string
  edit: string
  shippingMethod: string
  howDelivered: string
  pickUpOrder: string
  store: string
  chooseStore: string
  continueToPayment: string
  method: string
}

export type PaymentTranslations = {
  heading: string
  edit: string
  continueToReview: string
  enterCardDetails: string
  paymentMethod: string
  paymentDetails: string
  card: string
  giftCard: string
}

export type ReviewTranslations = {
  heading: string
  termsText: string
  placeOrder: string
  selectPaymentMethod: string
  loadingPaypal: string
  paypalUnavailable: string
}

export type SummaryTranslations = {
  inYourCart: string
  addPromotion: string
  apply: string
  promotionsApplied: string
}

export type CheckoutTranslations = {
  address: AddressTranslations
  delivery: DeliveryTranslations
  payment: PaymentTranslations
  review: ReviewTranslations
  summary: SummaryTranslations
}
