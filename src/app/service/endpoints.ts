export const ENDPOINTS = {
  CUSTOMERS: {
    GET_ALL: '/customers/',
    ADD_CUSTOMER: '/customers/add/',
  },
  DOCUMENTS: {
    ADD_DOCUMENT: (id: number) => `/customers/${id}/documents/add/`,
  },
};
