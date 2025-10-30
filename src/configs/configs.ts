
export const configs = {
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "My Market Admin",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",

  API_BASE_URL: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_BASE_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_BASE_URL,
  CLIENT_BASE_URL: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_CLIENT_BASE_URL_PRODUCTION : process.env.NEXT_PUBLIC_CLIENT_BASE_URL,

  TIMEOUT: Number(process.env.NEXT_PUBLIC_TIMEOUT) || 5000,
};