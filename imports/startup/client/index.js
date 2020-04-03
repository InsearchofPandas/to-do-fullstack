import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
// import ApolloClient from 'apollo-boost';
// import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { ApolloLink, from, concat } from "apollo-link";
import { Accounts } from "meteor/accounts-base";
import { MeteorAccountsLink } from "meteor/apollo";

import App from "../../ui/App";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const client = new ApolloClient({
  link: ApolloLink.from([
    new MeteorAccountsLink(),
    new HttpLink({
      uri: " http://localhost:4000/graphql",
    }),
  ]),
  cache: new InMemoryCache(),
});

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("app")
  );
});
