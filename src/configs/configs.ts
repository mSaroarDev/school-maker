
export const configs = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "My Market Admin",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8003/api",
  CLIENT_BASE_URL: process.env.NEXT_PUBLIC_CLIENT_BASE_URL || "http://localhost:5173",
  STORE_APP_URL: process.env.NEXT_PUBLIC_STORE_APP_URL || "http://localhost:3001",
  TIMEOUT: Number(process.env.NEXT_PUBLIC_TIMEOUT) || 5000,
};