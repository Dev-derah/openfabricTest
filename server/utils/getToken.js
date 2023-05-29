import { parse } from "cookie";
const getTokenFromCookie = (req) => {
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = parse(cookieHeader);
    return cookies.token;
  }
  return null;
};

export { getTokenFromCookie };
