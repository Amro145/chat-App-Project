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
    <Box bg={navbg} color={navcolor} className=" w-screen px-4  h-10  ">
      <nav className="border-gray-200">
        <ul className="  flex justify-between items-center pb-10">
          <li className="flex ">
            <Link to="/">
              <Home size={30} />
            </Link>
          </li>

          <li className="flex  gap-4">
            <Link to="/login" onClick={logout}>
              <LogOut className="transform rotate-180" size={30} />
            </Link>
            <Link to="/profile">
              <User size={30} />
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
