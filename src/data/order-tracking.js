export const ORDER_NUMBER_STRUCTURE = Object.freeze({
  prefix: 'MF',
  format: 'MF-YYYYMMDD-####',
  example: 'MF-20260818-0001',
  description: 'Mayfleur prefix + order date + four-digit daily sequence',
})

export const ORDER_STATUS_DEFINITIONS = Object.freeze([
  { id: 'received', order: 1, ko: '주문 접수', en: 'Inquiry Received' },
  { id: 'confirmed', order: 2, ko: '주문 확정', en: 'Order Confirmed' },
  { id: 'paid', order: 3, ko: '결제 완료', en: 'Payment Completed' },
  { id: 'in-production', order: 4, ko: '제작 중', en: 'In Production' },
  { id: 'in-delivery', order: 5, ko: '배송 중', en: 'In Delivery' },
  { id: 'delivered', order: 6, ko: '배송 완료', en: 'Delivered' },
])

// Data shape reserved for a future server-backed Order Lookup feature.
// No order lookup or client-side order data storage is enabled yet.
export const ORDER_RECORD_STRUCTURE = Object.freeze({
  orderNumber: null,
  status: 'received',
  statusHistory: [],
  productName: null,
  customerReference: null,
  createdAt: null,
  updatedAt: null,
})
