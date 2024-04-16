import { Dialog } from "@headlessui/react";
import Heading from "@/components/Heading";
import clsx from "clsx";

const SIZES = {
  md: "max-w-md",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

const Modal = ({ size = "3xl", title, isOpen, setIsOpen, children }) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className="relative z-50"
  >
    <div className="fixed inset-0 bg-queen-black/75" aria-hidden="true" />
    <div className="fixed inset-0 flex w-screen justify-center p-4">
      <Dialog.Panel
        className={clsx(
          "mx-auto w-full rounded-3xl bg-white py-16 px-10 overflow-y-auto",
          SIZES[size]
        )}
      >
        {title && (
          <Dialog.Title>
            <Heading size="2xl" className="text-center mb-12">
              {title}
            </Heading>
          </Dialog.Title>
        )}

        {children}
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default Modal;
