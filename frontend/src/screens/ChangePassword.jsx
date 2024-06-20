import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChangePasswordForm = () => {
  const { userId, token } = useParams();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [statusCode, setStatusCode] = useState(null);

  const handleSubmit = async (event) => {
    // compare password and confirm password
    event.preventDefault();
    console.log("Submitted");
    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    else if (String(password).trim().length < 4) {
      setError("Password should be at least 4 characters long");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/updatepassword', {
        userId: user._id,
        password: password

      });
      if (response.status === 200) {
        setError(<><Link to="/login">{response.data.message} Click here to login: Login</Link></>);
        setStatusCode(response.status);
      } else {
        setError(response.data.message);
        setStatusCode(response.status);
      }
    } catch (error) {
      setError(error.response.data.message);
      setStatusCode(error.response.status);
    }
  }

  const validateToken = async (userId, token) => {
    try {
      console.log(userId, token);
      const response = await axios.get(`http://localhost:8000/validate_reset_token/${userId}/${token}`);
      if (response.status === 200) {
        console.log(response.data.user);
        setUser(response.data.user);
        console.log("Token is valid");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    validateToken(userId, token);
  }, []); // run once

  return (
    <div>
      {user ? (
        <section class="bg-gray-50">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-40 w-auto"
                  src="https://logowik.com/content/uploads/images/piggy-bank9847.jpg"
                  alt="fundtasty logo"
                />
              </div>
              <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Change Password
              </h2>
              <form onSubmit={handleSubmit} class="mt-4 space-y-4 lg:mt-5 md:space-y-5" >
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                  <div id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" tabindex="0"> {user.username} </div>
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                </div>
                <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                  <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                </div>
                <p className={`mb-5 font-semibold ${statusCode === 200 ? "text-green-700" : "text-red-500" }` }>{error}</p>
                <button type="submit" class="w-full font-semibold text-base leading-6 text-indigo-600 hover:text-indigo-500">Reset password</button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <div
          class="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-blue-500 rounded-lg opacity-100 font-regular">
          Invalid token or token has expired. Please try again.
        </div>
      )}
    </div>
  );
}

export default ChangePasswordForm;

