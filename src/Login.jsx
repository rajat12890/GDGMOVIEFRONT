import React, { useState } from "react";
import { loginUser } from "./Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const switchTabs = (e, tab) => {
    navigate(`/${tab}`);
  };
  
  const showToastMessage = () => {
    toast.success("Successfully Login !");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      
      showToastMessage();
    } catch (error) {
      if (error.status && error.status == "429") {
        toast.error("To Many Requests");
      } else {
        toast.error("Credential Error");
      }
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900 h-screen  rounded-xl  w-screen">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Login
        </a>
        <div className="login_signUp_toggle text-white flex mb-5 ">
          <p
            onClick={(e) => switchTabs(e, "login")}
            className="mr-5 font-bold font-mono border-2 p-1 px-6 border-green-500 bg-green-500 rounded hover:text-green-500 hover:bg-gray-900 hover:border-none"
          >
            LOGIN
          </p>
          <p
            onClick={(e) => switchTabs(e, "register")}
            className="font-bold font-mono border-2 p-1 px-2 border-red-500 bg-red-500 rounded hover:text-red-500 hover:bg-gray-900 hover:border-none"
          >
            REGISTER
          </p>
        </div>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-yellow-600 hover:bg-transparent hover:text-yellow-500 hover:font-bold hover:text-md focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default Login;
