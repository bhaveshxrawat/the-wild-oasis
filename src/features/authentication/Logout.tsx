import ButtonIcon from "@/ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./hooks/useLogout";

function Logout() {
  const { isLoggingOut, logout } = useLogout();
  return (
    <ButtonIcon disabled={isLoggingOut} onClick={() => logout()}>
      <HiArrowRightOnRectangle opacity={isLoggingOut ? "0.7" : 1} />
    </ButtonIcon>
  );
}
export default Logout;
