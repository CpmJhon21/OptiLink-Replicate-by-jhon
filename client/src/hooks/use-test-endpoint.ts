import { useState } from "react";
import { Endpoint } from "@/lib/api-data";

export interface TestResponse {
  status: number;
  body: Record<string, unknown> | string;
  error?: string;
}

export function useTestEndpoint() {
  const [response, setResponse] = useState<TestResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const testEndpoint = async (endpoint: Endpoint) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    try {
      // Parse the pre-defined response from endpoint data
      let parsedResponse: Record<string, unknown> | string;
      
      try {
        parsedResponse = JSON.parse(endpoint.response);
      } catch {
        // If response is not valid JSON, use it as-is
        parsedResponse = endpoint.response;
      }

      setResponse({
        status: 200,
        body: parsedResponse,
      });
    } catch (error) {
      setResponse({
        status: 500,
        body: {},
        error:
          error instanceof Error
            ? error.message
            : "Failed to parse response",
      });
    } finally {
      setIsLoading(false);
      setIsOpen(true);
    }
  };

  return {
    response,
    isLoading,
    isOpen,
    setIsOpen,
    testEndpoint,
  };
}
