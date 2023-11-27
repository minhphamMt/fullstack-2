import axios from "../axios";
const handleLogin = (userEmail, userPassord) => {
  return axios.post("/api/login", { email: userEmail, password: userPassord });
};
const handleGetUser = (id) => {
  return axios.post("/api/get-all-users", { id: id });
};
const handleCreateNewService = (data) => {
  console.log("check data api:", data);
  return axios.post("/api/create-a-user", data);
};
export { handleLogin, handleGetUser, handleCreateNewService };
