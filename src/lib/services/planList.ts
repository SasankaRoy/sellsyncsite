import subscriptionApiClient from "../subscription-api";

export interface AddOnItem {
  _id: string;
  name: string;
  image?: string;
  short_details?: string;
  monthly_price: number;
  yearly_price: number;
}

export interface PlanAddOn {
  add_on_id: AddOnItem;
  enabled: boolean;
}

export interface PlanItem {
  _id: string;
  plan_name: string;
  monthly_price: number;
  yearly_price: number;
  number_of_locations: number;
  features: string[];
  add_ons: PlanAddOn[];
  status: string;
  created_by: string;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface PlanListResponse {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  results: PlanItem[];
}

export interface PlanListRequest {
  page: number;
  limit: number;
}

export async function fetchPlanList(
  params: PlanListRequest,
): Promise<PlanListResponse> {
  try {
    const response = await subscriptionApiClient.post<PlanListResponse>(
      "/api/v1/subscription/plan-list-without-access-token",
      params,
    );
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      throw new Error(
        axiosError.response?.data?.message || "Failed to fetch plans",
      );
    }
    throw new Error("Network error. Please try again.");
  }
}

export interface AddonListItem {
  _id: string;
  name: string;
  image?: string;
  short_details?: string;
  monthly_price: number;
  yearly_price: number;
  status: string;
}

export interface AddonListResponse {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  results: AddonListItem[];
}

export async function fetchAddonList(
  params: PlanListRequest,
): Promise<AddonListResponse> {
  try {
    const response = await subscriptionApiClient.post<AddonListResponse>(
      "/api/v1/subscription/addon-list-without-access-token",
      params,
    );
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      throw new Error(
        axiosError.response?.data?.message || "Failed to fetch add-ons",
      );
    }
    throw new Error("Network error. Please try again.");
  }
}
