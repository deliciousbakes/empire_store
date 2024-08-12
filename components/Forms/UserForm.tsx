/** @format */

"use client";
import { useActionState, useEffect, useState } from "react";
import { formatErrorMessages } from "@/lib/formatErrorMessages";
import { UserSchema } from "@/utils/UserValidation";
import { SubmitButton } from "../backend/Buttons";
import { createUser } from "@/actions/userActions";

const UserForm = () => {
  const [errorMessages, setErrorMessages] = useState("");
  const [state, formAction] = useActionState(createUser, {
    error: false,
    success: false,
  });

  useEffect(() => {
    if (state.error) {
      if (typeof state.errorDetails === "string") {
        setErrorMessages(state.errorDetails);
      } else {
        setErrorMessages(formatErrorMessages(state.errorDetails));
      }
      setErrorMessages(formatErrorMessages(state.errorDetails));
    } else if (state.success) {
      console.log("success");
    }
  }, [state]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = Object.fromEntries(formData);
    // console.log(fields);

    const validation = UserSchema.safeParse(fields);
    if (!validation.success) {
      // console.log(validation.error.flatten().fieldErrors);
      setErrorMessages(
        formatErrorMessages(validation.error.flatten().fieldErrors)
      );
    } else {
      formAction({ formData });
    }
  };

  return (
    <div className="border border-gray-600 w-[600px] rounded-lg p-8">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" className="font-medium text-gray-300">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full bg-gray-700 text-gray-300  rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block  font-medium text-gray-300"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full bg-gray-700 text-gray-300  rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block  font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-gray-700 text-gray-300  rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block  font-medium text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full bg-gray-700 text-gray-300  rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="address" className="block  font-medium text-gray-300">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full bg-gray-700 text-gray-300  rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="zip" className="block  font-medium text-gray-300">
            Zip Code
          </label>
          <input
            type="number"
            id="zip"
            name="zip"
            className="w-full bg-gray-700 text-gray-300  rounded-md shadow-sm p-2"
          />
        </div>
        {state.success ? (
          <span className="text-green-500">User has been added!</span>
        ) : (
          errorMessages && (
            <span
              className="text-red-500"
              dangerouslySetInnerHTML={{ __html: errorMessages }}
            />
          )
        )}

        <SubmitButton title={"Create user"} LoadingTitle={"Creating user..."} />
      </form>
    </div>
  );
};

export default UserForm;
