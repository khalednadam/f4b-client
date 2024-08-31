"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "next-auth/react";
import httpStatus from "http-status";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordChecklist } from "@/components/PasswordChecklist";
import { AnimatePresence } from "framer-motion";

const PASSWORD_REGEX: RegExp = new RegExp(
  "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$"
);
const USERNAME_REGEX: RegExp = new RegExp(
  "^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$"
);

const FormSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    username: z
      .string()
      .min(1, "Username is required")
      .regex(
        USERNAME_REGEX,
        "2-30 characters, alphanumeric, dots and underscores allowed (no consecutive dots/underscores)."
      ),

    password: z
      .string()
      .min(1, "Password is required")
      .regex(PASSWORD_REGEX, "password must match"),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

const SignUpPage = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfimrationVisible, setIsConfirmationPasswordVisible] =
    useState(false);
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const res = await fetch(`http://localhost:3000/users/register`, {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          username: values.username,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== httpStatus.CREATED) {
        toast({
          title: "Failed",
          description: res.statusText,
          variant: "destructive",
        });
        return null;
      }
      try {
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/",
        });
      } catch (err) {
        console.log(err);
        toast({
          title: "Failed",
          description: "Failed to login",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed",
        description: "Failed to register",
      });
    }
  };

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative w-full max-w-sm">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="your password"
                        {...field}
                        className="pr-10"
                        onBlur={() => setIsPasswordFieldFocused(false)}
                        onFocus={() => setIsPasswordFieldFocused(true)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        <Icon
                          icon={isPasswordVisible ? "ph:eye-slash" : "ph:eye"}
                          width={24}
                        ></Icon>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  <AnimatePresence>
                    {isPasswordFieldFocused && (
                      <PasswordChecklist password={form.watch("password")} />
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <div className="relative w-full max-w-sm">
                      <Input
                        {...field}
                        type={
                          isPasswordConfimrationVisible ? "text" : "password"
                        }
                        placeholder="Re-enter your password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        onClick={() =>
                          setIsConfirmationPasswordVisible(
                            !isPasswordConfimrationVisible
                          )
                        }
                      >
                        <Icon
                          icon={
                            isPasswordConfimrationVisible
                              ? "ph:eye-slash"
                              : "ph:eye"
                          }
                          width={24}
                        ></Icon>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col w-full">
        <Link href="/login">
          <Button variant="link">Already have an account? Login</Button>
        </Link>

        <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
          Sign up
        </Button>
      </CardFooter>
    </>
  );
};

export default SignUpPage;
