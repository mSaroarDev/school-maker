
export const configs = {
  APP_NAME: process.env.APP_NAME || "My Market Admin",
  APP_VERSION: process.env.APP_VERSION || "1.0.0",
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:8002/api",
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL || "http://localhost:5173",
  STORE_APP_URL: process.env.STORE_APP_URL || "http://localhost:3001",
  TIMEOUT: Number(process.env.TIMEOUT) || 5000,
};