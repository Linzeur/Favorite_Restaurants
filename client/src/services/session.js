import { apiUrl } from "../util";

const API_LOGIN = `${apiUrl}login`;
const API_LOGOUT = `${apiUrl}logout`;

async function login({ email, password }) {
  const response = await fetch(API_LOGIN, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

async function logout() {
  const response = await fetch(API_LOGOUT, {
    method: "DELETE",
    credentials: "include"
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }
}

export { login, logout };
