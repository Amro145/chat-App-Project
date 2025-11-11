import { Home, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Box, IconButton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useAuthStore } from "../../../../store/authStore";
import {
  useColorModeValue,
  useColorMode,
} from "../../../components/ui/color-mode";
function Info() {
  const { logout } = useAuthStore();
  const { toggleColorMode, colorMode } = useColorMode();
  const navbg = useColorModeValue("gray.100", "gray.900");
  const navcolor = useColorModeValue("gray.900", "gray.100");
  return (
    <Box
      bg={navbg}
      color={navcolor}
      className=" w-screen px-4 fixed  top-0 left-0 right-0 z-10 mb-0  h-10  "
    >
      <nav className="dark:border-gray-200 border-gray-900 ">
        <ul className="  flex justify-between items-center pb-10">
          <li className="flex ">
            <Link to="/">
              <Home size={25} />
            </Link>
          </li>

          <li className="flex items-center gap-4">
            <Link to="/login" onClick={logout}>
              <LogOut className="transform rotate-180" size={25} />
            </Link>
            <Link to="/profile">
              <User size={25} />
            </Link>
            <IconButton onClick={toggleColorMode} variant="outline" size="md">
              {colorMode === "light" ? (
                <LuSun className="text-9xl" />
              ) : (
                <LuMoon className="text-9xl" />
              )}
            </IconButton>
          </li>
        </ul>
      </nav>
    </Box>
  );
}

export default Info;
