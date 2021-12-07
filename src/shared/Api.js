import axios from "axios";

const api = axios.create({
  baseURL: "요청보낼 서버 도메인",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  //토큰정보 확인하고 다시 쪼개기
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
  return config;
});

export const apis = {
  // article
  add: (location, content, multipartFile, nickname) =>
    api.post("/api/board", location, content, multipartFile, nickname),
  edit: (location, content, multipartFile, id) =>
    api.put(`/api/board/detail/${id}`, location, content, multipartFile),
  del: (id) => api.delete(`/api/board/detail/${id}`),
  boards: () => api.get("/api/board"),
  board: (id) => api.get(`/api/board/detail/${id}`),

  // comment
  // addComment: (id, content) =>
  // 	api.post(`/api/articles/${id}/comments`, { content }),
  // comments: (id) => api.get(`/api/articles/${id}/comments`),
  // delComment: (id, coId) => api.delete(`/api/articles/${id}/comments/${coId}`),
  // editComment: (id, coId, content) =>
  // 	api.put(`/api/articles/${id}/comments/${coId}`, { content }),

  // user
  login: (id, pwd) => api.post("/user/login", { nickaname: id, password: pwd }),
  signup: (id, email, pwd) =>
    api.post("/user/signup", {
      nickname: id,
      email: email,
      password: pwd,
    }),
};