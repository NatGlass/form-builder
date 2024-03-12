"use client";

import { Form } from "@prisma/client";

function FormBuilder({ form }: { form: Form }) {
  return (
    <main className="flex flex-col w-full">
      <div className="flex justify-between p-4 gap-2 items-center">
        <h1 className="text-2xl font-bold truncate">{form.name}</h1>
      </div>
    </main>
  );
}

export default FormBuilder;
