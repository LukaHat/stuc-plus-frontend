import axios from "axios";

const baseAPIClient = axios.create({
  baseURL: "http://localhost:8000",
});

export enum Method {
  GET = "get",
  PATCH = "patch",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

interface RequestProps {
  token?: string;
  method?: Method;
  url: string;
  id?: string;
  data?: unknown;
}

export const request = async <T>(params: RequestProps): Promise<T> => {
  const { token, url, method, id, data } = params;

  try {
    const res = await baseAPIClient.request({
      method: method || "get",
      url: id ? `${url}/${id}` : url,
      data,
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    }
    throw error;
  }
};
