"use client";

import { useState, useEffect, useCallback } from "react";
import { PaymentManagement } from "@prisma/client";
import {
  getManagement,
  ManagementReturnProps,
} from "@/actions/payment-management/get-management";

interface UsePaymentManagementReturn {
  data: PaymentManagement[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePaymentManagement = (): UsePaymentManagementReturn => {
  const [data, setData] = useState<PaymentManagement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: ManagementReturnProps = await getManagement();

      if (response.success && response.data) {
        // Ensure dates are properly converted to Date objects
        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        }));
        setData(formattedData);
      } else {
        setError(response.message || "Failed to fetch data");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
