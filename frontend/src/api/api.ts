import axios from "axios";

const Base_Url = "http://localhost:3000/api/v1";

interface signupInterface {
  username: string;
  password: string;
  name?: string;
}
interface postContentInterface {
  title: string;
  type: string;
  link: string;
  tag?: string;
  data?: string;
}

export async function signup(body: signupInterface) {
  const res = await axios.post(`${Base_Url}/signup`, body);
  const data = res.data;
  return data;
}
export async function signin(body: signupInterface) {
  const res = await axios.post(`${Base_Url}/signin`, body);
  const data = res.data;
  return data;
}
export async function getContent(token: string) {
  const res = await axios.get(`${Base_Url}/content`, {
    headers: { Authorization: token },
  });
  const data = res.data;
  return data;
}

export async function setContent(body: postContentInterface, token: string) {
  const res = await axios.post(`${Base_Url}/content`, body, {
    headers: { Authorization: token },
  });
  const data = res.data;
  return data;
}
