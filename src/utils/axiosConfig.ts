export const base_url = "https://ecommerce-backend-seven-pi.vercel.app/api/";

export const config = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
};

export const api = {
  user: {
    register: () => `${base_url}user/register`,
    verify: { email: () => `${base_url}user/verify/email` },
    refresh: () => `${base_url}user/refresh`,
    login: () => `${base_url}user/login`,
    loginAdmin: () => `${base_url}user/admin-login`,
    logout: () => `${base_url}user/logout`,
    password: {
      forgotPassword: () => `${base_url}user/password/generate-reset-token`,
      reset: (token: string) => `${base_url}user/password/reset/${token}`,
      update: () => `${base_url}user/password/update`,
    },
    cart: {
      post: () => `${base_url}user/cart`,
      delete: () => `${base_url}user/cart`,
      get: () => `${base_url}user/cart`,
    },
    order: {
      getAll:()=> `${base_url}user/order`,
      payOnDelivery: () => `${base_url}user/order/pay-on-delivery`,
      payNow: () => `${base_url}user/order/pay-now`,
      getById: (id?: string) => `${base_url}user/order/${id}`,
      update: (id: string) => `${base_url}user/order/update/${id}`,
    },
    wishlist: {
      getById: (id?: string) => `${base_url}user/wishlist/${id}`,
      addOrRemove: (id: string) => `${base_url}user/wishlist/${id}`,
    },
    address: {
      getById: (id: string) => `${base_url}user/address/${id}`,
      post: () => `${base_url}user/address`,
      update: (id: string) => `${base_url}user/address/${id}`,
      delete: (id: string) => `${base_url}user/address/${id}`,
    },
    edit:()=> `${base_url}user/edit`,
    getById: (id:string)=>`${base_url}user/find/${id}`,
    getAll:()=> `${base_url}user/find`,
    block: (id:string)=>`${base_url}user/block/${id}`,
    unBlock: (id:string)=>`${base_url}user/unblock/${id}`,
    delete: (id:string)=>`${base_url}user/delete/${id}`,
  },
  product: {
    post:()=>`${base_url}product` ,
    update: (id:string)=>`${base_url}product/${id}`,
    delete: (id:string)=>`${base_url}product/${id}`,
    getById: (id: string) => `${base_url}product/${id}`,
    get: () =>`${base_url}product`,
  },
  search: {
    product: () => `${base_url}search/product`,
  },
  image: {
    post: () => `${base_url}image`,
    delete: (id: string) => `${base_url}image/${id}`,
  },
  enquiry: {
    post: () => `${base_url}enquiry`,
    update: (id: string) => `${base_url}enquiry/${id}`,
    delete: (id: string) => `${base_url}enquiry/${id}`,
    // getByUser: (id: string) => `enquiry/by-user/${id}`,
    getById: (id: string) => `${base_url}enquiry/${id}`,
    getAll:()=>`${base_url}enquiry`
  },
};



