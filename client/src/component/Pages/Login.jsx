import  { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";

function Login() {
  const [showPassword, setShowPassowrd] = useState(false);
  const { isLogining, login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.900", "gray.100");

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email  is  Required!");
    } else if (!formData.password) {
      toast.error("password  is  required!");
    } else if (formData.password.length < 6) {
      toast.error("password  is Too Short");
    } else {
      return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      login(formData);
    }
  };
  return (
    <Box
      bg={bg}
      color={color}
      className="min-h-screen overflow-hidden z-10 p-10 md:p-0 flex justify-center items-center"
    >
      <section className="w-full  flex justify-center">
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0 d">
          <div className=" w-full md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight -900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="   rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-full p-2  dark:border-gray-600 dark:placeholder-gray-400 -white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="flex w-100">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="-gray-50 border border-gray-300 -900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:-gray-700 dark:border-gray-600 dark:placeholder-gray-400 -white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                  type="button"
                    className="relative right-10  w-0 "
                    onClick={() => setShowPassowrd(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={30}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-eye"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit "
                className="w-full transition bg-blue-600 duration-500 hover:bg-blue-400  text-center py-3 rounded   my-1"
              >
                {isLogining ? (
                  <div className="flex justify-center">
                    loading ...
                    <Loader2 className="size-5 animate-spin" />
                  </div>
                ) : (
                  <div>Sing in</div>
                )}
              </button>
              <p className="text-sm font-light -500 dark:-400">
                Don’t have an account yet?
                <Link
                  to="/singup"
                  className=" block transition border border-blue-600 duration-500 hover:bg-blue-300  text-center py-3 rounded   my-1"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Box>
  );
}

export default Login;
