import Router from "next/router";
export const getJwt = () => {
    return localStorage.getItem('jwt');
}

export const reroute = (url: string) => {
    Router.push(url);
  };