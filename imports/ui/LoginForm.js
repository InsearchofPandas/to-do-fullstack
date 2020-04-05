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
        <div className="form">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label-name">
            <span className="content-name">Enter Email</span>
          </label>
        </div>

        <div className="form">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="label-name">
            <span className="content-name">Set Password</span>
          </label>
        </div>

        <button type="submit">Login User</button>
      </form>
    </div>
  );
}
