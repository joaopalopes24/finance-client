// ** External Imports
import { first, get, mapKeys } from "lodash";
import { UseFormReturn } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";

// ** Internal Imports
import { Pagination } from "@/hooks/table";

type ApiResponse = {
  data?: object;
  errors?: object;
  message?: string;
};

type Currency = {
  locale?: string;
  currency?: string;
};

/**
 * Response Helpers
 */
function getResponse(data: AxiosResponse | AxiosError): any {
  return data instanceof AxiosError ? data.response : data;
}

export function getData(data: AxiosResponse | undefined): any {
  return data?.data?.data;
}

export function getDataKey(data: AxiosResponse | undefined, key: string): any {
  return data?.data?.data?.[key];
}

export function getStatus(data: AxiosResponse | AxiosError): number {
  const response = getResponse(data);

  return response?.status || 500;
}

export function getMessage(data: AxiosResponse | AxiosError): string {
  const response = getResponse(data);

  return response?.data?.message || "";
}

export function getPagination(data: AxiosResponse | undefined): Pagination {
  const paginate = data?.data?.meta;

  return {
    total: paginate?.total || 0,
    limit: paginate?.per_page || 5,
    lastPage: paginate?.last_page || 1,
    currentPage: paginate?.current_page || 1,
  };
}

/**
 * Money Helpers
 */
export function formatMoney(value: number, data?: Currency): string {
  const locale = get(data, "locale", "en-US");

  const currency = get(data, "currency", "USD");

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

export function formatNumber(value: number, data?: Currency): string {
  const locale = get(data, "locale", "en-US");

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Validation Helpers
 */
export function getErrors(error: AxiosError): object {
  const response = error.response;

  return (response?.data as ApiResponse)?.errors || {};
}

export function getValidations(form: UseFormReturn, error: AxiosError): void {
  if (getStatus(error) === 422) {
    let errors = getErrors(error);

    mapKeys(errors, (value, key) => {
      form.setError(key, { message: first(value) });
    });
  }
}

export function withValidation(
  methods: any,
  model: string,
  withMessage: boolean = true,
) {
  const errors = methods.formState.errors;

  let hasError = Boolean(get(errors, model));

  let messageError = get(errors, model)?.message || "";

  return {
    error: hasError,
    helperText: !withMessage ? "" : messageError,
  };
}

/**
 * UI Helpers
 */
export const hexToRGBA = (hexCode: string, opacity: number) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
