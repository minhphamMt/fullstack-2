import axios from "../axios";
export const handleLogin = (userEmail, userPassord) => {
  return axios.post("/api/login", { email: userEmail, password: userPassord });
};
export const handleGetUser = (id) => {
  return axios.post("/api/get-all-users", { id: id });
};
export const handleCreateNew = (data) => {
  return axios.post("/api/create-a-user", { data: data });
};
