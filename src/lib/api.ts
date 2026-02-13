/**
 * API Configuration
 * Dynamically determines the API base URL based on environment
 */

// Get the API base URL from environment variable or detect from current location
const getApiBaseUrl = (): string => {
  // Check for Vite environment variable first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // In development, use localhost
  if (import.meta.env.DEV) {
    return 'https://sellsynctemplatebackend.onrender.com';
  }

  // In production, use the deployed API URL
  // You can set this to your deployed backend URL
  // For example: 'https://your-api.onrender.com'
  return import.meta.env.VITE_API_URL || 'https://sellsync-api.onrender.com';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  upload: `${API_BASE_URL}/api/upload`,
  publish: `${API_BASE_URL}/api/publish`,
  websites: `${API_BASE_URL}/api/websites`,
} as const;

/**
 * Get the full URL for an uploaded image
 * Handles both relative paths (/uploads/...) and absolute URLs
 */
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return '';

  // If it's already a full URL or a data URI, return as-is
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath;
  }

  // If it's a relative path, prepend the API base URL
  if (imagePath.startsWith('/uploads/')) {
    return `${API_BASE_URL}${imagePath}`;
  }

  return imagePath;
};

// Type for Vite's import.meta.env
declare global {
  interface ImportMetaEnv {
    VITE_API_URL?: string;
    DEV: boolean;
    PROD: boolean;
    MODE: string;
  }
}
