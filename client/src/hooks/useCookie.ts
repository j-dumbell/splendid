import { useCookies } from "react-cookie";
import { useBeforeunload } from "react-beforeunload";

export const useCookie = (cookieName: string) => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const cookie = cookies[cookieName];
  useBeforeunload(() => removeCookie(cookieName));
  return [
    cookie,
    (value: string) => setCookie(cookieName, value),
    () => removeCookie(cookieName),
  ];
};
