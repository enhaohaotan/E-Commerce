import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className={`
        m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800
        sm:max-w-96
      `}
    >
      <div className="mb-2 mt-10 inline-flex items-center gap-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full border border-gray-800 px-3 py-2"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        className="w-full border border-gray-800 px-3 py-2"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full border border-gray-800 px-3 py-2"
        placeholder="Password"
        required
      />
      <div className="mt-[-8px] flex w-full justify-between text-sm">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Creat account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button className="mt-4 bg-black px-8 py-2 font-light text-white">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
