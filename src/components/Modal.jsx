import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Modal = ({ children, className, ...otherProps }) => (
  <Dialog className="relative z-50 " transition {...otherProps}>
    <DialogBackdrop className="fixed inset-0 bg-black/30" />
    <div className="fixed inset-0 w-screen overflow-y-auto p-4">
      <div className="flex min-h-full items-center justify-center">
        <DialogPanel
          className={twMerge(
            clsx(
              "w-full rounded-3xl max-w-md backdrop-blur-2xl duration-200 ease-out data-[closed]:transform-[scale(80%)] data-[closed]:opacity-0 bg-white p-10",
              className
            )
          )}
          transition
        >
          {children}
        </DialogPanel>
      </div>
    </div>
  </Dialog>
);

export default Modal;
