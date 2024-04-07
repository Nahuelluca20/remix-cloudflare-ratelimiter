import { DialogTrigger, Modal, ModalOverlay } from "react-aria-components";
import { AlertDialog } from "~/components/ui/AlertDialog";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";

export default function AddNote() {
  return (
    <div>
      <DialogTrigger>
        <Button
          variant="secondary"
          className="px-2 py-1 flex items-center gap-[2px]"
        >
          {" "}
          Add Note
          <Plus className="h-4 w-4" />
        </Button>
        <ModalOverlay
          className={({ isEntering, isExiting }) => `
          fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur
          ${isEntering ? "animate-in fade-in duration-300 ease-out" : ""}
          ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""}
        `}
        >
          <Modal
            className={({ isEntering, isExiting }) => `
          dark:bg-zinc-900  w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl
            ${isEntering ? "animate-in zoom-in-95 ease-out duration-300" : ""}
            ${isExiting ? "animate-out zoom-out-95 ease-in duration-200" : ""}
          `}
          >
            <AlertDialog
              actionLabel="Delete"
              onAction={function Ya() {}}
              title="Delete folder"
              variant="destructive"
            >
              Are you sure you want to delete? All contents will be permanently
              destroyed.
            </AlertDialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
