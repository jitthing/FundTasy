import React from 'react';

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
const EmailInput = () => (
  <div>
    <label htmlFor="email" className="flex text-sm font-medium leading-6 text-gray-900">
      Email address
    </label>
    <div className="mt-2">
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);

// Password Input component
const PasswordInput = () => (
  <div>
    <div className="flex items-center justify-between">
      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
        Password
      </label>
      <div className="text-sm">
        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Forgot password?
        </a>
      </div>
    </div>
    <div className="mt-2">
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);

// SignInButton component
const SignInButton = () => (
    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </div>
  );

  // SignUpLink component
const SignUpLink = () => (
    <p className="mt-10 text-center text-sm text-gray-500">
      Don't have an account?{' '}
      <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        Sign up
      </a>
    </p>
  );

  // ContinueWithGoogle component
const ContinueWithGoogle = () => (
    <button 
      class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
      <div class="relative flex items-center space-x-4 justify-center">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg"
            class="absolute left-0 w-5" alt="google logo"/>
        <span
            class="block w-max font-semibold tracking-wide text-gray-700 dark:text-gray-900 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue
            with Google
        </span>
      </div>
    </button>
  );
  
  // ContinueWithApple component
  const ContinueWithApple = () => (
    <button 
      class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
      <div class="relative flex items-center space-x-4 justify-center">
        <img src="https://www.svgrepo.com/show/511330/apple-173.svg"
            class="absolute left-0 w-5" alt="apple logo"/>
        <span
            class="block w-max font-semibold tracking-wide text-gray-700 dark:text-gray-900 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue
            with Apple
        </span>
      </div>
    </button>
  );

// Form component
const Form = () => (
  <form className="space-y-6" action="#" method="POST">
    <EmailInput />
    <PasswordInput />
    <SignInButton />
  </form>
);

// LoginPage component
export default function LoginPage() {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Logo />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form />
          <SignUpLink />
          <p className="mt-3">OR</p>
          <div class="mt-10 grid space-y-4">
            <ContinueWithGoogle />
            <ContinueWithApple />
          </div>
        </div>
      </div>
    );
  }