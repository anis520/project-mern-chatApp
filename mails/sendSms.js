import axios from "axios";

export const sendSms = async (to, msg) => {
  await axios.get(`http/&&777/to=${to},message=${msg}`);
};
