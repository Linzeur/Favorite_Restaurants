import { cleanup } from "@testing-library/react";

global.fetch = require("jest-fetch-mock");

afterEach(cleanup);
beforeEach(() => {
  fetch.resetMocks();
});

const mockGeolocation = {
  watchPosition: jest.fn().mockImplementationOnce(success =>
    Promise.resolve(
      success({
        coords: {
          latitude: -11.9913905,
          longitude: -77.0873197
        }
      })
    )
  ),
  getCurrentPosition: jest.fn().mockImplementationOnce(success =>
    Promise.resolve(
      success({
        coords: {
          latitude: -11.9913905,
          longitude: -77.0873197
        }
      })
    )
  ),
  clearWatch: jest.fn().mockImplementationOnce(success => Promise.resolve("ok"))
};
global.navigator.geolocation = mockGeolocation;
