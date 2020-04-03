import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";

export default function LoginForm({ client }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (error) => {
      if (!error) {
        client.resetStore();
      }
      console.log(error);
    });
  };

  return (
    <div>
      <form onSubmit={login}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login User</button>
      </form>
    </div>
  );
}
