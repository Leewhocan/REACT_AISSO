export const getToken = () => {
  return localStorage.getItem("token") || "";
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  window.localStorage.removeItem("token");
};
