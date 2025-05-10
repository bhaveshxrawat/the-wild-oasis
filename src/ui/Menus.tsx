import { useClickOutside } from "@/hooks/useClickOutside";
import { createContext, use, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const StyledMenu = styled.div`
  position: relative;
`;

const StyledToggle = styled.button`
  display: flex;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: 0;
  margin-top: 0.25rem;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  min-width: max-content;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenuContextProps = {
  activeID: number | null;
  close: () => void;
  open: (id: number) => void;
};

const MenusContext = createContext<MenuContextProps | null>(null);

function useMenuContext() {
  const context = use(MenusContext);
  if (context === null) throw new Error("There is no 'Menus' Context");
  return context;
}

function Menus({ children }: { children: React.ReactNode }) {
  const [activeID, setActiveID] = useState<number | null>(null);
  const close = () => setActiveID(null);
  const open = (id: number) => setActiveID(id);
  return (
    <MenusContext.Provider value={{ activeID, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }: { children: React.ReactNode }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }: { id: number }) {
  const { activeID, close, open } = useMenuContext();
  function handleClick() {
    activeID === null || activeID !== id ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }: { id: number; children: React.ReactNode }) {
  const { activeID, close } = useMenuContext();
  const ref = useClickOutside<HTMLUListElement>(close);
  if (activeID !== id) return null;
  return (
    <StyledList className="menu-list" ref={ref}>
      {children}
    </StyledList>
  );
}
function Button({
  children,
  icon,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { close } = useMenuContext();

  function handleClick() {
    onClick ? onClick() : undefined;
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} {...props}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
