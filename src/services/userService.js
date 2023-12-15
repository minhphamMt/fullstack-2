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
const handleDeleteUser = (id) => {
  console.log(">>>check id :", id);
  return axios.delete("/api/delete-a-user", {
    data: {
      id: id,
    },
  });
};
const handleEditUser = (data) => {
  return axios.put("/api/edit-a-user", data);
};
const getAllCode = (inputType) => {
  return axios.get(`/api/getAllCode?type=${inputType}`);
};
export {
  handleLogin,
  handleGetUser,
  handleCreateNewService,
  handleDeleteUser,
  handleEditUser,
  getAllCode,
};
