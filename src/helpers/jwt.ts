import Router from "next/router";
import jwtDecode from "jwt-decode";

export const getJwt = () => {
  try {
    return localStorage.getItem("jwt");
  } catch (error) {
    return null;
  }
};

export const reroute = (url: string) => {
  const isClient = typeof document !== "undefined";
  isClient && Router.replace(url);
};

export const getUserId = () => {
  try {
    const jwt = getJwt();
    const user = jwtDecode(jwt);
    return user.id;
  } catch (error) {
    return false;
  }
};
