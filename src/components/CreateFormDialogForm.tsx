"use client";

import { CreateForm } from "@/actions/form";
import { formSchema, formSchemaType } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

type CreateFormDialogFormProps = {
  setClosed: () => void;
};

function CreateFormDialogForm({ setClosed }: CreateFormDialogFormProps) {
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: formSchemaType) {
    try {
      const formId = await CreateForm(data);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
      setClosed();
      router.push(`/builder/${formId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating the form.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Form name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Form description"
                  rows={4}
                  className="resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {!form.formState.isSubmitting && <span>Create</span>}
          {form.formState.isSubmitting && <span>Creating...</span>}
        </Button>
      </form>
    </Form>
  );
}

export default CreateFormDialogForm;
