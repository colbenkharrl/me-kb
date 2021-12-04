import { render, screen } from "@testing-library/react";
import { Mock } from "../../Mock";
import { QueryComponent } from "../QueryComponent";

test("renders greeting", async () => {
  const value = "test greeting";
  render(
    <Mock customResolvers={{ Greeting: () => ({ value }) }}>
      <QueryComponent />
    </Mock>
  );
  const linkElement = await screen.findByText(value);
  expect(linkElement).toBeInTheDocument();
});
