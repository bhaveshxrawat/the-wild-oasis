import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useThemeContext } from "@/context/ThemeContext";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeContext();
  return (
    <ButtonIcon onClick={toggleTheme}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
export default ThemeToggle;
