/** @format */
"use client";
import LoginForm from "@/components/Forms/LoginForm";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  // console.log(`session from login form: ${session}}`);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <section>
      <div className="md:container px-4 md:px-0   mt-20">
        <div className="border-gray-400 dark:border-gray-700 max-w-md mx-auto border my-3 shadow rounded-md ">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
