import { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-800/40  backdrop-blur">
      {children}
    </div>
  );
};

export default Modal;
