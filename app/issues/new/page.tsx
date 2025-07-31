"use client";
import { TextField, Button, Callout, Text, Spinner } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi2";
import { zodResolver } from "@hookform/resolvers/zod";
import { issuesSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
// for client side rendering
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// this is a built in that make a interface with the help of defining of the schema
type issueForm = z.infer<typeof issuesSchema>;

const page = () => {
  const [isSubmitted, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<issueForm>({
    resolver: zodResolver(issuesSchema),
  });

  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit = async (data: issueForm) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues/", data);
      router.push("/issues");
      alert("Successfully Added!");
    } catch (e) {
      setError("An unexpected Error");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <HiInformationCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          placeholder="Title"
          size="3"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* if some libraries does not allow to directly modify the properties use controller  */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit" disabled={isSubmitted}>
          Submit New Issue {isSubmitted && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default page;
