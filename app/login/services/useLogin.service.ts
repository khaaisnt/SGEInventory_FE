import { useMutation } from "@tanstack/react-query";
import type { LoginType } from "../types/login.type";
import axiosInstance from "@/lib/axiosInstace";
import { saveToCookie, saveRoleToCookie } from "@/helpers/cookies";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface LoginResponse {
  data: {
    expiresIn: number;
    token: string;
    tokenType: string;
    user: {
      id: number;
      fullName: string;
      email: string;
      contact: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  message: string;
}

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (body: LoginType) => {
      try {
        const { data: response } = await axiosInstance.post<LoginResponse>(
          "/auth/login",
          body,
        );

        const role = response.data.user.role.toUpperCase();
        const dashboardByRole: Record<string, string> = {
          USER: "/user/dashboard",
          ADMIN: "/administrator/dashboard",
        };
        const dashboardPath = dashboardByRole[role];

        if (!dashboardPath) {
          throw new Error(`Role login tidak didukung: ${role}`);
        }

        saveToCookie("token", response.data.token);
        saveRoleToCookie(role);

        toast.success("Berhasil masuk");
        router.push(dashboardPath);

        return response;
      } catch (error: unknown) {
        const errorMessage =
          (axios.isAxiosError<{ message?: string }>(error)
            ? error.response?.data?.message
            : error instanceof Error
              ? error.message
              : undefined) || "Gagal masuk, silakan coba lagi";
        toast.error(errorMessage);

        throw error;
      }
    },
  });
};
