export type AppConfig = {
  name: string;
  apiUrl: string;
};

const appConfig: AppConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Sunset Finance",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost",
};

export default appConfig;
