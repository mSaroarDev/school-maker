
interface ErrorResponse {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
}

export function handleErrorMessage(error: unknown): string {
  if (isErrorResponse(error)) {
    return error.response?.data?.error || error.response?.data?.message || "Something went wrong";
  }

  return "Something went wrong";
}

function isErrorResponse(error: unknown): error is ErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object"
  );
}