"use client";

import { DndContext } from "@dnd-kit/core";
import { Form } from "@prisma/client";
import Designer from "./Designer";
import PreviewDialogButton from "./PreviewDialogButton";
import PublishFormButton from "./PublishFormButton";
import SaveFormButton from "./SaveFormButton";
import DragOverlayWrapper from "./DragOverlayWrapper";

function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <main className="flex w-screen h-full flex-col">
        <nav className="flex justify-between p-4 gap-2 items-center w-full">
          <h1 className="text-2xl font-bold truncate">{form.name}</h1>
          <div className="flex gap-2 items-center">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto bg-accent h-full">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
