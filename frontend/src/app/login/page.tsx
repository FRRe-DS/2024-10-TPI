"use client"
import { useState } from "react";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="mx-auto flex  p-5   flex-col justify-center items-center">
      <h1 className="font-bold text-xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-2 rounded"
            required
          />
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={toggleForm}
        className="mt-4 text-blue-500 underline"
      >
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  );
}
