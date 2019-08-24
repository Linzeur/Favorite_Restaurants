import { apiUrl } from "../util";

const API_FAVORITES = `${apiUrl}favorite_restaurants`;

async function listFavorites() {
  const response = await fetch(API_FAVORITES, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

async function createFavorite(favoriteData) {
  const response = await fetch(API_FAVORITES, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(favoriteData),
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

async function deleteFavorite(favoriteId) {
  const response = await fetch(`${API_FAVORITES}/${favoriteId}`, {
    method: "DELETE",
    credentials: "include"
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

export { listFavorites, createFavorite, deleteFavorite };
