import { apiUrl } from "../util";

const API_SPOTS = `${apiUrl}spots`;

async function listSpots(lat, lng) {
  const response = await fetch(`${API_SPOTS}?lat=${lat}&lng=${lng}`, {
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

async function getSpot(spotId) {
  const response = await fetch(`${API_SPOTS}/${spotId}`, {
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

async function deleteSpotFavorite(spotId) {
  const response = await fetch(`${API_SPOTS}/${spotId}`, {
    method: "DELETE",
    credentials: "include"
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

export { listSpots, getSpot, deleteSpotFavorite };
