import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import logo from "./logo.svg";
import "./App.css";
import { QueryComponent } from "../QueryComponent";
import { getClient } from "../../apollo/getClient";

export const App: FC = () => {
  return (
    <ApolloProvider client={getClient()}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <QueryComponent />
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
