import { DialogTrigger, Modal, ModalOverlay } from "react-aria-components";
import { AlertDialog } from "~/components/ui/AlertDialog";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { Form } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const noteSchema = zod.object({
  title: zod.string().min(1).max(20),
  content: zod.string().min(1).max(60),
  description: zod.string().min(1).max(30),
  tags: zod.string().min(1).max(30),
});

type FormData = zod.infer<typeof noteSchema>;

const resolver = zodResolver(noteSchema);

const inputStyle =
  "mt-[2px] border-2 rounded-md px-2 py-1.5 flex-1 min-w-0 outline outline-0 bg-white dark:bg-zinc-900 text-sm text-gray-800 dark:text-zinc-200 disabled:text-gray-200 dark:disabled:text-zinc-600";

export default function AddNote() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onChange",
    resolver,
  });

  console.log(errors);
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
              actionLabel="Add Note"
              title="Add Note"
              variant="info"
              onAction={() => handleSubmit()}
            >
              Complete form to add a new note.
              <Form
                method="post"
                className="space-y-2 mt-4"
                onSubmit={() => handleSubmit()}
              >
                <div>
                  <label className="flex flex-col">
                    Title
                    <input
                      className={inputStyle}
                      type="text"
                      {...register("title")}
                    />
                    {errors?.title && (
                      <p className="text-red-600">{errors?.title.message}</p>
                    )}
                  </label>
                </div>
                <div>
                  <label className="flex flex-col">
                    Description
                    <input
                      className={inputStyle}
                      type="description"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </label>
                </div>
                <div>
                  <label className="flex flex-col">
                    Content
                    <input
                      className={inputStyle}
                      type="content"
                      {...register("content")}
                    />
                    {errors.content && (
                      <p className="text-red-600">{errors.content.message}</p>
                    )}
                  </label>
                </div>
                <div>
                  <label className="flex flex-col">
                    Tags
                    <input
                      className={inputStyle}
                      type="tags"
                      {...register("tags")}
                    />
                    {errors.tags && (
                      <p className="text-red-600">{errors.tags.message}</p>
                    )}
                  </label>
                </div>
              </Form>
            </AlertDialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
