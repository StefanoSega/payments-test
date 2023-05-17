import axios from "axios";

type RestResponse<T> = {
  isSuccess: boolean;
  data?: T;
  error?: any;
};

export class RestService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T, P>(
    url: string,
    params?: P,
    bearerToken?: string
  ): Promise<RestResponse<T>> {
    const response = await axios.get<T>(`${this.baseUrl}/${url}`, {
      params,
      headers: {
        ...(bearerToken
          ? { Authorization: `Bearer ${bearerToken}` }
          : undefined),
      },
    });

    if (response.status >= 400) {
      return {
        isSuccess: false,
        error: response.statusText,
      };
    }

    return {
      isSuccess: true,
      data: response.data,
    };
  }

  async post<T, P>(
    url: string,
    params?: P,
    bearerToken?: string
  ): Promise<RestResponse<T>> {
    try {
      const response = await axios.post<T>(`${this.baseUrl}/${url}`, params, {
        headers: {
          ...(bearerToken
            ? { Authorization: `Bearer ${bearerToken}` }
            : undefined),
        },
      });

      if (response.status >= 400) {
        return {
          isSuccess: false,
          error: response.statusText,
        };
      }

      return {
        isSuccess: true,
        data: response.data,
      };
    } catch (exc) {
      return {
        isSuccess: false,
        error: exc.response.data,
      };
    }
  }

  async put<T, P>(
    url: string,
    params?: P,
    bearerToken?: string
  ): Promise<RestResponse<T>> {
    const response = await axios.put<T>(`${this.baseUrl}/${url}`, params, {
      headers: {
        ...(bearerToken
          ? { Authorization: `Bearer ${bearerToken}` }
          : undefined),
      },
    });

    if (response.status >= 400) {
      return {
        isSuccess: false,
        error: response.statusText,
      };
    }

    return {
      isSuccess: true,
      data: response.data,
    };
  }

  async patch<T, P>(
    url: string,
    params?: P,
    bearerToken?: string
  ): Promise<RestResponse<T>> {
    const response = await axios.patch<T>(`${this.baseUrl}/${url}`, params, {
      headers: {
        ...(bearerToken
          ? { Authorization: `Bearer ${bearerToken}` }
          : undefined),
      },
    });

    if (response.status >= 400) {
      return {
        isSuccess: false,
        error: response.statusText,
      };
    }

    return {
      isSuccess: true,
      data: response.data,
    };
  }

  async delete<T, P>(
    url: string,
    params?: P,
    bearerToken?: string
  ): Promise<RestResponse<T>> {
    const response = await axios.delete<T>(`${this.baseUrl}/${url}`, {
      params,
      headers: {
        ...(bearerToken
          ? { Authorization: `Bearer ${bearerToken}` }
          : undefined),
      },
    });

    if (response.status >= 400) {
      return {
        isSuccess: false,
        error: response.statusText,
      };
    }

    return {
      isSuccess: true,
      data: response.data,
    };
  }
}
