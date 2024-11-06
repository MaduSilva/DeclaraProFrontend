export const ENDPOINTS = {
  CUSTOMERS: {
    GET_ALL: '/customers/',
    ADD_CUSTOMER: '/customers/add/',
    DELETE_CUSTOMER: (id: number) => `/customers/${id}/`,
  },
  DOCUMENTS: {
    ADD_DOCUMENT: (id: number) => `/customers/${id}/documents/add/`,
  },
};
