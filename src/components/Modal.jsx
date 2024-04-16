import { Dialog } from "@headlessui/react";
import Heading from "@/components/Heading";

const Modal = ({ title, isOpen, setIsOpen, children }) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className="relative z-50"
  >
    <div className="fixed inset-0 bg-queen-black/75" aria-hidden="true" />
    <div className="fixed inset-0 flex w-screen justify-center p-4">
      <Dialog.Panel className="mx-auto w-full max-w-3xl rounded-3xl bg-white py-16 px-10 overflow-y-auto">
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
