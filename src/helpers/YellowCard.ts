import axios, { AxiosError, type AxiosResponse } from "axios";
import dotenv from "dotenv";

export class YellowCard {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    dotenv.config();

    this.apiKey = process.env.YELLOW_CARD_API_KEY || "";
    this.baseUrl = process.env.YELLOW_CARD_BASE_URL || "";
  }

  private async handleRequest(
    type: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    request?: any[],
  ): Promise<any> {
    const signature = "";

    const httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 100000,
      headers: {
        Authorization: `YcHmacV1 ${this.apiKey}:${signature}`,
        "Content-Type": "application/json",
        "X-YC-Timestamp": new Date().toISOString(),
      },
    });

    httpClient[type.toLowerCase() as "get" | "post" | "put" | "delete"](
      path,
      request,
    )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          // Check for successful status codes (2xx)
          return response.data;
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .catch(
        (
          error: AxiosError<
            any,
            {
              code: string;
              message: string;
            }
          >,
        ) => {
          let errorMessage = "An unexpected error occurred.";

          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.data && error.response.data) {
              errorMessage = error.response.data.message;
            } else {
              errorMessage = JSON.stringify(error.response.data);
            }
          } else if (error.request) {
            // The request was made but no response was received
            errorMessage = "No response received from the server.";
          } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
          }

          throw new Error(`Request to ${path} failed: ${errorMessage}`);
        },
      );
  }
}
