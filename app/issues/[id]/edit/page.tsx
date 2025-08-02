"use client";
import { ErrorMessage } from "@/app/components";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { issuesSchema } from "@/app/validationSchema";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Button, Spinner, TextField } from "@radix-ui/themes";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
interface Props {
  params: { id: string };
}

type issueForm = z.infer<typeof issuesSchema>;

const page = ({ params }: Props) => {
  const [isSubmitted, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<issueForm>({
    resolver: zodResolver(issuesSchema),
  });

  const onSubmit = (data: issueForm) => console.log(data);

  return (
    <div>
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
