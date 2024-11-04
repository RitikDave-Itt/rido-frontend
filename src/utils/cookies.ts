import Cookies from "js-cookie";


export const getAccessToken = (): string | undefined => {
  return Cookies.get("accessToken");
};


export const getRefreshToken = (): string | undefined => {
  return Cookies.get("refreshToken");
};
