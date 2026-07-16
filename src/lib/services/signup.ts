import subscriptionApiClient from "../subscription-api";

export interface ExtraAddon {
  addon_id: string;
  addon_name: string;
  addon_price: number;
}

export interface SignupRequest {
  full_name: string;
  email: string;
  contact_number: string;
  business_name: string;
  business_type: string;
  country_location: string;
  subscription_plan_id: string;
  package_duration_type: "monthly" | "yearly";
  extra_addon: ExtraAddon[];
  hardware_kit_quantity?: number;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state_province?: string;
  zip_postal_code?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    id?: string;
  };
}

export async function submitSignup(
  data: SignupRequest,
): Promise<SignupResponse> {
  try {
    const response = await subscriptionApiClient.post<SignupResponse>(
      "/api/v1/subscription/signup-save",
      data,
    );
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      throw new Error(
        axiosError.response?.data?.message || "Failed to submit registration",
      );
    }
    throw new Error("Network error. Please try again.");
  }
}