"use client";

import { useDroppable } from "@dnd-kit/core";
import DesignerSidebar from "./DesignerSidebar";

function Designer() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropForm: true,
    },
  });
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-center flex-1 overflow-y-auto">
          <p className="text-3xl text-muted-foreground font-bold">
            Drag component here
          </p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

export default Designer;
