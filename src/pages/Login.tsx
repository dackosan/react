import { useState } from "react";
import { Button } from "react-bootstrap";
import type { User } from "../types/User";

function Login() {
  const [user, setUser] = useState<User>({ username: "", password: "" });

  return (
    <>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <br />
      <input type="password" />
      <br />
      <Button variant="succes">Bejelentkezés</Button>
    </>
  );
}

export default Login;
