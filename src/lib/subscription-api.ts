import axios from "axios";

const SUBSCRIPTION_API_URL =
  import.meta.env.VITE_SUBSCRIPTION_API_URL ||
  "https://sell-sync.kyptronix.com";

const SUBSCRIPTION_API_KEY =
  import.meta.env.VITE_SUBSCRIPTION_API_KEY || "";

const subscriptionApiClient = axios.create({
  baseURL: SUBSCRIPTION_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": SUBSCRIPTION_API_KEY,
  },
});

// Request interceptor
subscriptionApiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
subscriptionApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const serverMessage =
        data?.message || data?.error || data?.detail || "";

      switch (status) {
        case 401:
          console.error("Unauthorized access", serverMessage);
          break;
        case 403:
          console.error("Forbidden access", serverMessage);
          break;
        case 404:
          console.error("Not found", serverMessage);
          break;
        case 500:
          console.error("Internal server error", serverMessage);
          break;
        default:
          console.error(`API error (${status}):`, serverMessage);
      }
    } else if (error.request) {
      console.error("No response received from subscription API");
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default subscriptionApiClient;