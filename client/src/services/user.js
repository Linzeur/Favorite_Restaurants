import { apiUrl } from "../util";

const API_USERS = `${apiUrl}users`;

async function createUser(userData) {
  const response = await fetch(API_USERS, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

export { createUser };
