import { render, screen } from "@testing-library/react";
import { Mock } from "../../Mock";
import App from "../App";

test("renders learn react link", () => {
  render(
    <Mock>
      <App />
    </Mock>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
