import http from "./http";

const university = {
  add: (data) => http.post("/admin/university/create", data),
  update: (data) => http.post("/admin/university/update", data),


  list: (param) => http.get("/admin/university/list", { params: param }),

  Delete: (param) => http.delete(`/admin/university/delete?id=${param}`),
  getOne: (param) => http.get(`/admin/university/view?id=${param}`),

};

export default university;

 