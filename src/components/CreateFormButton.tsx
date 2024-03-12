"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import CreateFormDialogForm from "./CreateFormDialogForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

function CreateFormButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create New Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <CreateFormDialogForm setClosed={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormButton;
