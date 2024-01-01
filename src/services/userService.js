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
const getDoctor = (limit) => {
  return axios.get(`/api/doctor-home?limit=${limit}`);
};
const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctor`);
};
const handleCreateInfo = (data) => {
  return axios.post("/api/post-info-doctor", data);
};
const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const EditDetailDoctor = (data) => {
  return axios.put("/api/edit-detail-doctor", data);
};
const CreateBulkSchedule = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
export {
  handleLogin,
  handleGetUser,
  handleCreateNewService,
  handleDeleteUser,
  handleEditUser,
  getAllCode,
  getDoctor,
  getAllDoctor,
  handleCreateInfo,
  getDetailInfoDoctor,
  EditDetailDoctor,
  CreateBulkSchedule,
};
