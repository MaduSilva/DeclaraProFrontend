export const ENDPOINTS = {
  CUSTOMERS: {
    GET_ALL: '/customers/',
    GET_ONE: (id: number) => `/customers/${id}/`,
    ADD_CUSTOMER: '/customers/add/',
    DELETE_CUSTOMER: (id: number) => `/customers/remove/${id}/`,
    EDIT_CUSTOMER: (id: number) => `/customers/edit/${id}/`,
    RESET_PASSWORD_CUSTOMER: (id: number) => `/customers/reset-password/${id}/`,
    LOGIN_CUSTOMER: '/customers/login/',
    GET_CLIENTES_HOME_DATA: (id: number) => `/clientes/${id}/dados`,
  },
  DOCUMENTS: {
    ADD_DOCUMENT: (id: number) => `/customers/${id}/documents/add/`,
    DELETE_DOCUMENT: (customerId: number, documentId: number) =>
      `/customers/${customerId}/documents/${documentId}/`,
  },
  ADMIN: {
    LOGIN: '/api/token/',
  },
};
