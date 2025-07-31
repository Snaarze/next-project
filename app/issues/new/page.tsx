"use client";
import { TextField, Flex, Button } from "@radix-ui/themes";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const page = () => {
  return (
    <Flex direction="column" gap="3" className="max-w-xl">
      <TextField.Root placeholder="Title" size="3"></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </Flex>
  );
};

export default page;
