"use client";
import { User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUser(data);
    };
    fetchUser();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign...." />
      <Select.Content>
        <Select.Group>
          <Select.Label> Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
