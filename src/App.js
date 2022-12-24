import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";

import { getAll, create, update } from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const { info, className } = message;

  const blogFormRef = useRef();

  const sortByLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    } else if (a.likes > b.likes) {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const getBlogs = async () => {
      const returnedBlogs = await getAll();

      const sortedBlogs = [...returnedBlogs];
      sortedBlogs.sort(sortByLikes);
      setBlogs(sortedBlogs);
    };
    getBlogs();
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

  const displayMessage = (message) => {
    const { info, className } = message;
    setMessage({ info: info, className: className ? className : "success" });
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await create(newBlog, user.token);
      blogFormRef.current.toggleVisible();
      displayMessage({
        info: `A new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`,
      });

      setBlogs([...blogs, returnedBlog]);
    } catch (error) {
      displayMessage({ className: "error", info: error.message });
    }
  };

  const updateBlog = async (id, blogToUpdate) => {
    let { title, url, author, likes } = blogToUpdate;

    const updating = {
      title,
      url,
      author,
      likes: likes + 1,
    };

    try {
      const returnedBlog = await update(id, updating);

      console.log("returnedBlog ==>", returnedBlog);

      displayMessage({ info: `blog ${title} updated!` });

      const updatedBlogs = blogs.map((blog) =>
        blog.id === returnedBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
      );

      const sortedBlogs = [...updatedBlogs];
      sortedBlogs.sort(sortByLikes);
      setBlogs(sortedBlogs);

      setBlogs(sortedBlogs);
    } catch (error) {
      displayMessage({ className: "error", info: error.message });
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const loginUser = await login({ username, password });
      if (loginUser.token) {
        window.localStorage.setItem("loggedInUser", JSON.stringify(loginUser));
        setUser(loginUser);

        setUsername("");
        setPassword("");

        displayMessage({ info: "Successfully logged in" });
      }
    } catch (error) {
      console.log("failure to log in because :->", error);
      displayMessage({
        className: "error",
        info: "Wrong username or password",
      });
    }
  };

  if (user === null) {
    return (
      <div>
        {message && <Notification {...{ info, className }} />}
        <h2>Log in to application</h2>
        <Toggable label="Login">
          <LoginForm
            {...{
              formHandler,
              username,
              usernameHandler,
              password,
              passwordHandler,
            }}
          />
        </Toggable>
      </div>
    );
  }

  return (
    <div>
      {message && <Notification {...{ info, className }} />}

      {user && (
        <div>
          <h2>User</h2>
          <p>{user.username} logged in</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
      <br />
      <Toggable label="Create new blog" ref={blogFormRef}>
        <NewBlog {...{ addBlog }} />
      </Toggable>

      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} {...{ updateBlog }} />
        ))}
      </div>
    </div>
  );
};

export default App;
