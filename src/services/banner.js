import http from "./http";

const banner = {
  add: (data) => http.post("/admin/banner/create", data),
  update: (data) => http.post("/admin/banner/update", data),
  deleteImage: (data) => http.post("/common/delete-image", data),
  uploadImage: (data) => http.post("/common/upload-image", data),

  list: (param) => http.get("/admin/banner/list", { params: param }),

  Delete: (param) => http.delete(`/admin/banner/delete?id=${param}`),

  status: (id) =>
    http.post(`/admin/banner/activate-deactivate?id=${id}`),

  getOne: (param) => http.get(`/admin/banner/view?id=${param}`),
  status: (id) =>
    http.post(`/admin/banner/activate-deactivate?id=${id}`),

};

export default banner;

