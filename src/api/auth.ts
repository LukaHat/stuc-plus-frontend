import { Method, request } from "./base";

export const register = async (token: string) => {
  try {
    return await request({
      method: Method.POST,
      url: "auth/register",
      data: {},
      token,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
