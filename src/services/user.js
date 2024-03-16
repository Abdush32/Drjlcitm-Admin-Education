import http from "./http";

const user = {
  login: (data) => http.post("/admin/auth/login", data),

};

export default user;

