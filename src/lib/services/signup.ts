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
  number_of_hardware_kit?: number;
  hardware_kit_addressline1?: string;
  hardware_kit_addressline2?: string;
  hardware_kit_city?: string;
  hardware_kit_state?: string;
  hardware_kit_zipcode?: string;
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