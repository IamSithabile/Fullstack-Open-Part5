import axios from 'axios';

const baseUrl = '/api/login';

const login = async (userDetails) => {
  const request = await axios.post(baseUrl, userDetails);
  const response = await request.data;
  console.log(response);

  return response;
};

export default login;
