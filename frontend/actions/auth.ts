"use server";

import { cookies } from "next/headers";
import {redirect } from "next/navigation";
import { registerUserService } from "@/lib/strapi";
import { SignupFormSchema, type FormState } from "@/validations/auth";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  domain: process.env.HOST ?? 'localhost',
  secure: process.env.NODE_ENV === "production",
};

export async function registerUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log("Register User Action Invoked");

  const fields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = SignupFormSchema.safeParse(fields);
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation errors occurred",
      strapiErrors: null,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      data: fields,
    };
  }

  const response = await registerUserService(validatedFields.data);
  if (!response || response.error) {

    return {
      success: false,
      message: "Registration errors occurred",
      strapiErrors: response?.error,
      zodErrors: null,
      data: fields,
    };
  }

const cookieStore = await cookies();
cookieStore.set("jwt", response.jwt, cookieConfig);
redirect("/dashboard");
}
