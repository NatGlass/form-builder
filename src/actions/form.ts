"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schema/form";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const formStats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = formStats._sum.visits || 0;
  const submissions = formStats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}

export async function CreateForm(data: formSchemaType) {
  const validatedData = formSchema.safeParse(data);

  if (!validatedData.success) { 
    throw new Error("Invalid data");
  }

  const user = await currentUser();

  if (!user) { 
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.create({
    data: {
      ...validatedData.data,
      userId: user.id,
    },
  })

  if (!form) {
    throw new Error("Error creating form");
  }

  return form.id

}

export async function GetForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return forms;
}

export async function GetFormById(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  return form;
}