export const base_url = "https://ecommerce-backend-seven-pi.vercel.app/api/";
export  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };