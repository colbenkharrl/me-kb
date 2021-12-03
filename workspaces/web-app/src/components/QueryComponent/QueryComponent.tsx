import { FC } from "react";
import { useQuery } from "@apollo/client";

import { QueryComponentQuery } from "./QueryComponentQuery.graphql";
import { QueryComponentQuery as QueryComponentQueryType } from "./__generated__/QueryComponentQuery";
import "./QueryComponent.css";

export const QueryComponent: FC = () => {
  const { data, loading } =
    useQuery<QueryComponentQueryType>(QueryComponentQuery);

  console.log(data, loading);

  return (
    <p>{loading ? "Loading..." : data?.greeting?.value || "No greeting."}</p>
  );
};
