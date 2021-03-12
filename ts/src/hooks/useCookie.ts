import { useCookies } from "react-cookie";

export const useCookie = (cookieName: string) => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const cookie = cookies[cookieName];
  return [
    cookie,
    (value: string) => setCookie(cookieName, value),
    () => removeCookie(cookieName),
  ];
};
