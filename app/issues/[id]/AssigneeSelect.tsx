"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign...." />
      <Select.Content>
        <Select.Group>
          <Select.Label> Suggestions</Select.Label>
          <Select.Item value="1">Jeremy Panlasigui</Select.Item>
          <Select.Item value="2">Catherine Bello</Select.Item>
          <Select.Item value="3">Jomar Supsupin</Select.Item>
          <Select.Item value="4">Neil</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
