import { createContext } from "react";
import { render, screen } from "@testing-library/react";
import { ContextOverwriter } from "../ContextOverwriter";

const TestContext = createContext<{ value: string }>({
  value: "default value",
});

test("overrides context", () => {
  render(
    <TestContext.Provider value={{ value: "default value" }}>
      <ContextOverwriter
        Context={TestContext}
        newValues={{ value: "test value" }}
      >
        <TestContext.Consumer>
          {({ value }) => <p>{value}</p>}
        </TestContext.Consumer>
      </ContextOverwriter>
    </TestContext.Provider>
  );

  const linkElement = screen.getByText("test value");
  expect(linkElement).toBeInTheDocument();
});
