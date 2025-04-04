import React, {
  use,
  useState,
  createContext,
  cloneElement,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type ModalContextProps = {
  openName: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
};

const ModalContext = createContext<ModalContextProps | null>(null);

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModalContext() {
  const context = use(ModalContext);
  if (context === null) throw new Error("There is not Modal Context");
  return context;
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement & { props: { onClick?: () => void } };
  opens: string;
}) {
  const { open } = useModalContext();
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({
  children,
  name,
}: {
  children: React.ReactElement & {
    props: {
      cancelHandler?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    };
  };
  name: string;
}) {
  const { openName, close } = useModalContext();
  const modalRef = useRef<HTMLDivElement>(null);
  function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!modalRef.current) return;
    if (e.target instanceof Node && modalRef.current.contains(e.target)) return;
    close();
  }
  if (name !== openName) return null;
  return createPortal(
    <Overlay onClick={handleOutsideClick}>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { cancelHandler: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
