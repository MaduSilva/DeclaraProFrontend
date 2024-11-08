export const ENDPOINTS = {
  CUSTOMERS: {
    GET_ALL: '/customers/',
    GET_ONE: (id: number) => `/customers/${id}/`,
    ADD_CUSTOMER: '/customers/add/',
    DELETE_CUSTOMER: (id: number) => `/customers/remove/${id}/`,
  },
  DOCUMENTS: {
    ADD_DOCUMENT: (id: number) => `/customers/${id}/documents/add/`,
    DELETE_DOCUMENT: (customerId: number, documentId: number) =>
      `/customers/${customerId}/documents/${documentId}/`,
  },
};
