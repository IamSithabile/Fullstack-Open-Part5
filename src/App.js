import { Routes, Route, Navigate, useMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Login';
import Homepage from './components/Homepage';
import User from './components/User';
import BlogItem from './components/BlogItem';
import Logout from './components/Logout';

import './index.css';

const App = () => {
  const reduxUser = useSelector((state) => state.user);

  const userMatch = useMatch('users/:id');
  const id = userMatch ? userMatch.params.id : '';

  const match = useMatch('blogs/:id');
  const blogId = match ? match.params.id : '';

  return (
    <div className=" ">
      <div className="absolute z-10  flex w-full justify-start space-x-28 bg-blue-100  text-xl font-bold">
        <Link
          className="m-12 rounded-full bg-gray-400 py-2 px-4 shadow-lg shadow-white"
          to="/users"
        >
          Users
        </Link>
        <Link
          className="m-12 rounded-full bg-gray-400 py-2 px-4  shadow-lg shadow-white"
          to="/blogs"
        >
          Blogs
        </Link>
        <Logout />
      </div>

      <Routes>
        <Route path="/" element={<Navigate replace to={'/users'} />} />
        <Route path="/users" element={reduxUser ? <Homepage /> : <Login />} />
        <Route path="/users/:id" element={<User {...{ id }} />} />
        <Route path="/blogs/:id" element={<BlogItem {...{ blogId }} />} />
      </Routes>
    </div>
  );
};

export default App;
