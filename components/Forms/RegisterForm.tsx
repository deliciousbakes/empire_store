/** @format */
"use client";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { UserProps } from "@/types/types";
import { Headset, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createUser } from "@/actions/UserActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import PasswordInput from "../FormInputs/PasswordInput";
import { Button } from "../ui/button";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserProps>();
  const router = useRouter();
  async function onSubmit(data: UserProps) {
    setLoading(true);
    data.name = `${data.firstName} ${data.lastName}`;
    data.role = "USER";
    // data.image = "tent-3.jpg";
    // "https://utfs.io/f/59b606d1-9148-4f50-ae1c-e9d02322e834-2558r.png";
    try {
      const res = await createUser(data);
      console.log(res);
      if (res.status === 409) {
        setLoading(false);
        setEmailErr(res.error);
      } else if (res.status === 200) {
        setLoading(false);
        toast.success("Account Created successfully");
        router.push("/login");
        reset();
      } else {
        setLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong, try again");
    }
  }
  return (
    <div className="w-full py-5 lg:px-8 px-6 dark:text-gray-900">
      <div className="">
        <div className="py-4">
          <h2 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="text-xs">Join Us, fill in details to Signup</p>
        </div>
      </div>
      <div className="">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              register={register}
              errors={errors}
              label="First Name"
              name="firstName"
              icon={User}
              placeholder="first Name"
            />
            <TextInput
              register={register}
              errors={errors}
              label="Last Name"
              name="lastName"
              icon={User}
              placeholder="last Name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              register={register}
              errors={errors}
              label="Phone"
              name="phone"
              icon={Headset}
              placeholder="phone"
            />
            <TextInput
              type="email"
              register={register}
              errors={errors}
              label="Email Address"
              name="email"
              icon={Mail}
              placeholder="email"
            />
            {emailErr && (
              <p className="text-red-500 text-xs -mt-2">{emailErr}</p>
            )}
          </div>
          <PasswordInput
            register={register}
            errors={errors}
            label="Password"
            name="password"
            icon={Lock}
            placeholder="password"
            type="password"
          />
          <div>
            <SubmitButton
              title="Sign Up"
              loadingTitle="Creating Please wait.."
              loading={loading}
              className="w-full"
              loaderIcon={Loader2}
              showIcon={false}
            />
          </div>
        </form>
        <div className="flex items-center pt-4  justify-center space-x-1">
          <div className="h-[2px] w-full bg-slate-300"></div>
          <div className="uppercase  text-black">Or</div>
          <div className="h-[2px] w-full bg-slate-300"></div>
        </div>
        <div className="flex items-center justify-between py-6">
          <Button
            variant={"outline"}
            className="bg-slate-300 dark:bg-slate-600"
          >
            <FaGoogle className="mr-2 w-6 h-6 text-red-600 " />
            Signup with Google
          </Button>
          <Button
            variant={"outline"}
            className="bg-slate-300 dark:bg-slate-600"
          >
            <FaGithub className="mr-2 w-6 h-6 text-slate-900 " />
            Signup with Github
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Alrealy Registered ?{" "}
          <Link
            href="/Signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
