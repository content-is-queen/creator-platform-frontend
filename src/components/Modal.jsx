import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Modal = ({ children, className, ...otherProps }) => (
  <Dialog className="relative z-50" {...otherProps}>
    <div className="fixed inset-0 bg-queen-black/75" aria-hidden="true" />
    <div className="fixed inset-0 flex w-screen justify-center p-4 lg:items-center">
      <Dialog.Panel
        className={twMerge(
          clsx(
            "mx-auto w-full rounded-3xl bg-white pt-16 px-10 pb-10 overflow-y-auto",
            className
          )
        )}
      >
        {children}
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default Modal;
