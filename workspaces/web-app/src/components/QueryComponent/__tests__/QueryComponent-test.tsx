import { render, screen } from "@testing-library/react";
import { Mock } from "../../Mock";
import { QueryComponent } from "../QueryComponent";

test("renders greeting", async () => {
  render(
    <Mock>
      <QueryComponent />
    </Mock>
  );
  const linkElement = await screen.findByText("Hello, world!");
  expect(linkElement).toBeInTheDocument();
});
