import React from "react";
import { render, act } from "@testing-library/react";
import { AuthProvider } from "./authProvider";

describe("AuthProvider", () => {});
it("should set isAuthenticated to true when both JWTtoken and userId are present in sessionStorage", () => {
  const mockToken = "mock-token";
  const mockUserId = "mock-user-id";

  jest.spyOn(window.sessionStorage, "getItem").mockImplementation((key) => {
    if (key === "JWTtoken") return mockToken;
    if (key === "userId") return mockUserId;
    return null;
  });

  let renderedComponent;
  act(() => {
    renderedComponent = render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>
    );
  });

  const { getByText } = renderedComponent;
  expect(getByText("Test Child")).toBeInTheDocument();

  // Access the AuthProvider's value
  const authContext =
    renderedComponent.container.firstChild.__reactProps$.value;
  expect(authContext.isAuthenticated).toBe(true);
  expect(authContext.token).toBe(mockToken);
  expect(authContext.playerId).toBe(mockUserId);
});
