import http from "./http";

const course = {
  add: (data) => http.post("/admin/course/create", data),
  update: (data) => http.post("/admin/course/update", data),


  list: (param) => http.get("/admin/course/list", { params: param }),

  Delete: (param) => http.delete(`/admin/course/delete?id=${param}`),
  getOne: (param) => http.get(`/admin/course/view?id=${param}`),

};

export default course;

