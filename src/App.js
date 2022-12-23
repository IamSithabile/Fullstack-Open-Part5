import { useState, useEffect } from "react";
import Blog from "./components/Blog";

import blogService from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
    }
  }, []);

  const usernameHandler = (e) => {
    const {
      target: { value },
    } = e;

    setUsername(value);
  };
  const passwordHandler = (e) => {
    const {
      target: { value },
    } = e;

    setPassword(value);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const loginUser = await login({ username, password });
    if (loginUser.token) {
      window.localStorage.setItem("loggedInUser", JSON.stringify(loginUser));
      setUser(loginUser);

      setUsername("");
      setPassword("");
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={formHandler}>
          <label>
            Username:{" "}
            <input
              type="text"
              name="username"
              value={username}
              onChange={usernameHandler}
            />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              value={password}
              onChange={passwordHandler}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>User</h2>
      <div>
        <p>{user.username} logged in</p>
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
