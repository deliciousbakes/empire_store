/** @format */

import RegisterForm from "@/components/Forms/RegisterForm";

export default function page() {
  return (
    <section>
      <div className="md:container px-4 md:px-0   mt-20 items-center">
        <div className="border-gray-400 dark:border-gray-700 max-w-xl mx-auto border my-3 shadow rounded-md ">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
