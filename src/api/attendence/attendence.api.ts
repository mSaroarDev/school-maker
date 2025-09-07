import request from "../apiRequest"

export const getAllAttendence = async (payload) => {
  console.log("getAllAttendence called with payload:", payload);
  const res = await request.get("/attendence", { params: payload });
  return res.data;
};

export const updateAttendence = async (payload) => {
  const res = await request.put("/attendence/update", payload);
  return res.data;
};