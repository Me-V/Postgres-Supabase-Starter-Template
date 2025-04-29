"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-white font-bold text-5xl ">THE FORM</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label
            className="block text-sm font-medium text-white"
            htmlFor="name"
          >
            Name
          </label>
          <input
            {...register("name", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 border border-white h-[5vh]"
            type="text"
            id="name"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-white"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 border border-white h-[5vh]"
            type="email"
            id="email"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      <p className="text-3xl text-white font-bold mt-5">For the Tutorial</p>
      <Link href="https://drive.google.com/file/d/16J_rKobjJsYGGR4oQ2pmcukCT89GVqly/view?usp=drive_link">
        <button className="p-3 mt-2 border border-white rounded-lg">
          Download PDF
        </button>
      </Link>
    </div>
  );
}
