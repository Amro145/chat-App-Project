import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData?.userName?.trim()) {
      toast.error("User Name is  Required!");
    } else if (!formData?.email?.trim()) {
      toast.error("Email  is  Required!");
    } else if (!formData?.password) {
      toast.error("password  is  required!");
    } else if (formData?.password?.length < 6) {
      toast.error("password  is Too Short");
    } else {
      return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signUp(formData);
    }
  };
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.900", "gray.100");
  return (
    <Box
      bg={bg}
      color={color}
      className="min-h-screen p-4 min-w-screen z-10 fixed top-0 flex justify-between "
    >
      <div className=" container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center  ">
        <div className="header mb-10">
          <h1 className=" text-3xl font-bold text-center">Welcome to Chat</h1>
          <h3>Sign Up and enjoy with communication</h3>
        </div>
        <div className=" py-8 rounded  w-full">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border-grey-light w-full p-2 rounded mb-4 "
              name="fullname"
              placeholder="Full Name"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e?.target?.value })
              }
            />

            <input
              type="text"
              className="block  border-grey-light w-full p-2 rounded mb-4"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e?.target?.value })
              }
            />
            <div className="flex w-85">
              <input
                type={showPassword ? "text" : "password"}
                className="block  border-grey-light w-full p-2 rounded mb-4 "
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e?.target?.value,
                  })
                }
              />
              <button
                type="button"
                className="relative right-10 -top-2 w-0 "
                onClick={() => setShowPassword(!showPassword)}
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

            <button
              type="submit "
              className="w-full transition bg-blue-600 duration-500 hover:bg-blue-400  text-center py-3 rounded   my-1"
            >
              {isSigningUp ? (
                <div className="flex justify-center">
                  loading ...
                  <Loader2 className="size-5 animate-spin" />
                </div>
              ) : (
                <div>Sign Up</div>
              )}
            </button>
          </form>
        </div>
        <div className=" mt-6">
          <div className="">
            <span className="">Already have Account ?</span>
          </div>
          <Link
            className="w-full block transition border border-blue-600 duration-500 hover:bg-blue-300  text-center py-3 rounded   my-1"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </Box>
  );
}

export default SignUp;
