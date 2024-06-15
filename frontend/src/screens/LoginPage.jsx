import React, { useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* global confetti */
import { X } from "lucide-react";
import confetti from "canvas-confetti";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
/* TODO
  - Storing token of user in local storage
  - Create middleware to verify the token & extract user information
  - Add logic for forgot password
    - Check if user is signed in with Google / Apple / Email
  - Add logic Apple sign in
  - Fix high memory usage

 */

// Form handling function
function formSubmission(e) {
  e.preventDefault();
  // The data can be taken directly from the form submission or from the state variables 'email' and 'password'
  const formElements = e.target.elements;
  const formName = e.target.name;
  const email = formElements.email.value;
  const password = formElements.password.value;
  console.log(email, password);
  if (formName === "signup") {
    confetti();
  }
}

const Modal = ({
  handleEmailChange,
  handlePasswordChange,
  closeModal,
  handleSignUp,
  isSignUpEmailInvalid,
  isSignUpPasswordInvalid,
  signUpError,
}) => (
  <div className="fixed w-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
    <div className="sm:mx-auto sm:w-3/4 sm:max-w-xs bg-indigo-200 flex flex-col rounded-xl p-5">
      <button onClick={closeModal} className="place-self-end">
        <X size={30} />
      </button>
      <h1 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register
      </h1>
      <p className="text-xs leading-7 mb-4 tracking-widest">
        It's quick and easy.
      </p>
      <EmailInput handleEmailChange={handleEmailChange} isSignUpEmailInvalid={isSignUpEmailInvalid} />
      <PasswordInput handlePasswordChange={handlePasswordChange} isSignUpPasswordInvalid={isSignUpPasswordInvalid} />
      <br />
      <p className="text-red-500 mb-5">{signUpError}</p>
      <SubmitButton text="Sign up" handleClick={handleSignUp} />
    </div>
  </div>
);

// Logo component
const Logo = () => (
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      className="mx-auto h-40 w-auto"
      src="https://logowik.com/content/uploads/images/piggy-bank9847.jpg"
      alt="fundtasty logo"
    />
    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign in to your account
    </h2>
  </div>
);

// Email Input component
const EmailInput = ({ handleEmailChange, isInvalid, isSignUpEmailInvalid }) => (
  <div>
    <label
      htmlFor="email"
      className="flex text-sm font-medium leading-6 text-gray-900"
    >
      Email address
    </label>
    <div className="mt-2">
      <input
        onChange={handleEmailChange}
        id="email"
        name="email"
        type="text" // set to text for now for ease of testing
        autoComplete="email"
        required
        className={`${isInvalid||isSignUpEmailInvalid ? 'bg-red-200': ''} block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
      />
    </div>
  </div>
);

// Password Input component
const PasswordInput = ({ handlePasswordChange, text, isInvalid, isSignUpPasswordInvalid }) => (
  <div>
    <div className="flex items-center justify-between">
      <label
        htmlFor="password"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Password
      </label>
      <div className="text-sm">
        <a
          href="#"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {text}
        </a>
      </div>
    </div>
    <div className="mt-2">
      <input
        onChange={handlePasswordChange}
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className={`${isInvalid||isSignUpPasswordInvalid ? 'bg-red-200': ''} block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
      />
    </div>
  </div>
);

// SignInButton component
const SubmitButton = ({ text, handleClick }) => (
  <div>
    <button
      onClick={handleClick}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {text}
    </button>
  </div>
);

// SignUpLink component
const SignUp = ({ showModal }) => (
  <p className="mt-10 text-center text-sm text-gray-500">
    Don't have an account?{" "}
    <button
      onClick={showModal}
      className="font-semibold text-base leading-6 text-indigo-600 hover:text-indigo-500"
    >
      Sign up
    </button>
  </p>
);

// ContinueWithGoogle component
const ContinueWithGoogle = ({setValidCredentials, navigate}) => {
  const handleCallbackResponse = async (response) => {
    // console.log("JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);

    // Send the token to the backend
    try {
      const backendResponse = await axios.post("http://localhost:8000/google_login", {
        token: response.credential,
      });

      if (backendResponse.status === 200) {
        setValidCredentials(true);
        navigate("/");
        console.log(backendResponse.data);
        // Verify if stored. Developer console -> Application -> Local Storage
        localStorage.setItem("authToken", backendResponse.data.authToken); 
      } else {
        console.error("Failed to create an account. Try signing up with email.");
      }
    } catch (error) {
      console.error("An error occurred while sending the token to the backend", error);
    }
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse,
      autoSelect: false,
    });
  }, []);

  const handleSignInClick = () => {
    window.google.accounts.id.prompt();
  };

  return (
    <button
      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
      onClick={handleSignInClick}
    >
      <div className="relative flex items-center space-x-4 justify-center">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="absolute left-0 w-5"
          alt="google logo"
        />
        <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-gray-900 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
          Continue with Google
        </span>
      </div>
    </button>
  );
};

// ContinueWithApple component
const ContinueWithApple = () => (
  <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
    <div class="relative flex items-center space-x-4 justify-center">
      <img
        src="https://www.svgrepo.com/show/511330/apple-173.svg"
        class="absolute left-0 w-5"
        alt="apple logo"
      />
      <span class="block w-max font-semibold tracking-wide text-gray-700 dark:text-gray-900 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
        Continue with Apple
      </span>
    </div>
  </button>
);

// LoginPage component
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [validCredentials, setValidCredentials] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [isLoginInputInvalid, setInputInvalid] = useState(false);
  const [isSignUpEmailInvalid, setSignUpInputInvalid] = useState(false);
  const [isSignUpPasswordInvalid, setSignUpPasswordInvalid] = useState(false);

  function handleModal() {
    setModal((prevModal) => !prevModal);
  }
  function updateEmailState(event) {
    setEmail(event.target.value);
    console.log(event.target.value);
  }
  function updatePasswordState(event) {
    setPassword(event.target.value);
    console.log(event.target.value);
  }

  const handleLogin = async () => {
    const userEmail = email;
    const userPassword = password;
    try {
      // console.log("success");
      const response = await axios.post("http://localhost:8000/login", {
        username: userEmail,
        password: userPassword,
      });

      if (response.status === 200) {
        setValidCredentials(true);
        navigate("/");
        console.log(response.data);
        localStorage.setItem("authToken", response.data.authToken); 
      }
    } catch (error) {
      setError("Incorrect username or password");
      setInputInvalid(true);
      navigate("/login");
    }
  };

  const handleSignUp = async () => {
    const inputEmail = email;
    const inputPassword = password;
    try {
      const response = await axios.post(
        "http://localhost:8000/create_account",
        {
          username: inputEmail,
          password: inputPassword,
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      navigate("/login");
      const errorResponse = error.response.data.message;  
      console.log(errorResponse);
      if (errorResponse === "Username already exists") {
        setSignUpPasswordInvalid(false); // reset the state to original
        setSignUpInputInvalid(true);
        setSignUpError(errorResponse);
        
      } else if (errorResponse === "Password is too short") {
        setSignUpInputInvalid(false); // reset the state to original
        setSignUpPasswordInvalid(true);
        setSignUpError(errorResponse);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Logo />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <EmailInput handleEmailChange={updateEmailState} isInvalid={isLoginInputInvalid} />
        <PasswordInput handlePasswordChange={updatePasswordState} isInvalid={isLoginInputInvalid} text="Forgot password?"/>
        <br />
        <p className="text-red-500 mb-5">{error}</p>
        <SubmitButton text="Sign in" handleClick={handleLogin} />
        <SignUp showModal={handleModal} />
        <p className="mt-3">OR</p>
        <div class="mt-10 grid space-y-4">
          <ContinueWithGoogle setValidCredentials={setValidCredentials} navigate={navigate} />
          <ContinueWithApple />
        </div>
      </div>
      {modal && (
        <Modal
          closeModal={handleModal}
          handleEmailChange={updateEmailState}
          handlePasswordChange={updatePasswordState}
          handleSignUp={handleSignUp}
          isSignUpEmailInvalid={isSignUpEmailInvalid}
          isSignUpPasswordInvalid={isSignUpPasswordInvalid}
          signUpError={signUpError}
        />
      )}
    </div>
  );
}
