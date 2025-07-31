"use client";
import { TextField, TextArea, Flex, Box, Button } from "@radix-ui/themes";
import React from "react";

const page = () => {
  return (
    <Flex direction="column" gap="3" className="max-w-xl">
      <TextField.Root placeholder="Title" size="3"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </Flex>
  );
};

export default page;
