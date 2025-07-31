"use client";
import { TextField, Button } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";

// for client side rendering
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const page = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const onSubmit = async (data: IssueForm) => {
    await axios.post("/api/issues/", data);
    router.push("/issues");
    alert("Successfully Added!");
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root
        placeholder="Title"
        size="3"
        {...register("title")}
      ></TextField.Root>
      {/* if some libraries does not allow to directly modify the properties use controller  */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default page;
