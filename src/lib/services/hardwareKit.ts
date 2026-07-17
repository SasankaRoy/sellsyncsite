import subscriptionApiClient from "../subscription-api";

export interface HardwareDeviceItem {
  _id: string;
  device_type?: string;
  device_name?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  asset_id?: string;
  status?: string;
}

export interface HardwareKitItem {
  id: string;
  business_id?: string;
  kit_name: string;
  kit_price?: number;
  kit_status?: string;
  hardware_device_id?: HardwareDeviceItem[];
}

export interface HardwareKitListResponse {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  results: HardwareKitItem[];
}

export interface HardwareKitListRequest {
  page: number;
  limit: number;
  search_text?: string;
}

export function getHardwareKitDisplayName(kit: HardwareKitItem): string {
  return kit.kit_name || kit.id;
}

export async function fetchHardwareKitList(
  params: HardwareKitListRequest,
): Promise<HardwareKitListResponse> {
  try {
    const response = await subscriptionApiClient.post<HardwareKitListResponse>(
      "/api/v1/common/hardware-device-user-kit-list",
      params,
    );
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      throw new Error(
        axiosError.response?.data?.message || "Failed to fetch hardware kit list",
      );
    }
    throw new Error("Network error. Please try again.");
  }
}
