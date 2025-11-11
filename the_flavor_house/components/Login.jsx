"use client";

import React, { useState } from "react";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    userName: z
      .string()
      .min(3, "At least 3 characters")
      .max(30, "Maximum 30 characters"),
    password: z
      .string()
      .min(6, "At least 6 characters")
      .max(30, "Maximum 30 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth", data);
      toast.success("Login successful!");
      router.push("/waiter");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className=" text-xl lg:text-3xl font-bold text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-sm lg:text-lg text-white/70">
          Sign in to The Flavor House
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    {...form.register("userName")}
                  />
                </FormControl>
                {form.formState.errors.userName && (
                  <FormMessage className="text-red-400">
                    {form.formState.errors.userName.message}
                  </FormMessage>
                )}
              </FormItem>
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    {...form.register("password")}
                  />
                </FormControl>
                {form.formState.errors.password && (
                  <FormMessage className="text-red-400">
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            </FieldGroup>
          </FieldSet>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-white text-black font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
