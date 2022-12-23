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
      setUser(loginUser);
    }
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
          <button>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
