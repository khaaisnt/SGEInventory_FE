"use client";

import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "./services/useLogin.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginType } from "./types/login.type";
import { loginSchema } from "./validations/login.schema";

const LoginPage = () => {
  const { mutate, status } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginType) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <main className="min-h-screen w-full md:grid md:grid-cols-2">
      <section className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-8 md:px-10 lg:px-16">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 text-primary-900">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Continue your journey
            </h1>
            <p className="text-sm mt-2">Sign in to continue to your account</p>
          </div>

          <Input
            placeholder="Email"
            placeholderIcon="bx:user"
            type="email"
            fullWidth
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            placeholder="Password"
            placeholderIcon="bx:lock"
            type="password"
            fullWidth
            {...register("password")}
            error={errors.password?.message}
          />

          <Button fullWidth onClick={handleSubmit(onSubmit)}>
            {status === "pending" ? "Loading..." : "Sign In"}
          </Button>
          <Link href="/register" className="text-center">
            <Button variant="outline" fullWidth className="mt-2">
              Create an account
            </Button>
          </Link>
        </div>
      </section>

      <section className="relative hidden h-screen p-6 md:block">
        <Image
          src="/assets/background-auth.png"
          alt="background"
          width={300}
          height={500}
          className="h-full w-full rounded-3xl object-cover"
        />

        <div className="absolute left-1/4 top-1/4">
          <Image src="/assets/logo.png" alt="logo" width={65} height={65} />
          <h2 className="mb-2 mt-4 text-3xl font-bold text-primary-900 lg:text-4xl">
            Welcome back to <br />
            <span
              className="mb-2 text-4xl  font-bold tracking-tight
             [-webkit-text-stroke:4px_white] 
             [paint-order:stroke_fill] 
             drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]"
            >
              <span className="text-primary-600">Rack</span>
              <span className="text-primary-900">IT</span>
            </span>
          </h2>
          <p className="font-light text-primary-900">
            Need something? We&lsquo;ve got a rack for that.
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
