import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import Info from "./HomePage/Info";

function Profile() {
  const { isUpdateProfile, authUser, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpdate = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profile: base64Image });
    };
  };
  const [formData, setFormData] = useState({
    userName: authUser.data.userName,
    email: authUser.data.email,
    profile: authUser.data.profile,
  });

  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.900", "gray.100");

  return (
    <Box color={color} bg={bg} className="">
      <div className="flex gap-3 flex-col w-full    py-5 justify-center items-center  ">
        <div className="gap-3 grid   w-full text-center px-5 max-w-sm  border border-gray-200 rounded-lg shadow-sm dark:-800 dark:border-gray-700">
          <div className="title">
            <h1 className="text-2xl">{authUser.data.userName}</h1>
          </div>
          <div className="text">
            <h1>Your Profile Information</h1>
          </div>
          <div className="flex flex-col items-center pb-10">
            <div>
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                alt="Bonnie image"
                src={selectedImage || formData?.profile || ""}
              />

              <div className="flex items-center justify-center w-full ">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-10 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 -500 dark:-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    disabled={isUpdateProfile}
                    onChange={handleImageUpdate}
                  />
                </label>
              </div>
            </div>
            <h5 className=" font-medium -900 dark:">Upload Image</h5>
          </div>
          <div className="inputs grid gap-5">
            <input
              name="userName"
              id="userName"
              className="-50 border border-gray-300 -900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="UserName"
              value={authUser.data.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
            <input
              name="email"
              id="email"
              className="mb-10 -50 border border-gray-300 -900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="amro@gmail.com"
              value={authUser.data.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="gap-2  grid px-10 w-full pb-3 text-center max-w-sm  border border-gray-200 rounded-lg shadow-sm dark:-800 dark:border-gray-700">
          <div className="title">Acount Information</div>
          <div className="flex justify-between">
            <div>membersince</div>
            <div>
              {authUser.data.createdAt
                ? authUser.data.createdAt.slice(0, 10)
                : "unknown"}{" "}
            </div>
          </div>
          <hr />
          <div className="flex justify-between">
            <div>Account Status</div>
            <div className="text-green-900">Active</div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Profile;
