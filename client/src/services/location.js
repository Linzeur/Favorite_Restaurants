import { apiUrl } from "../util";

const API_LOCATION = `${apiUrl}locations`;

async function listLocations() {
  const response = await fetch(API_LOCATION, {
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

async function createLocation(locationData) {
  const response = await fetch(API_LOCATION, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(locationData),
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

async function updateLocation(locationId, locationData) {
  const response = await fetch(`${API_LOCATION}/${locationId}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(locationData),
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

async function deleteLocation(locationId) {
  const response = await fetch(`${API_LOCATION}/${locationId}`, {
    method: "DELETE",
    credentials: "include"
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors.message);
  }

  return response.json();
}

export { listLocations, createLocation, updateLocation, deleteLocation };
