import { AlertDialog, Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  error: boolean;
  modifyError: () => void;
}

const DeleteDialog = ({ error, modifyError }: Props) => {
  return (
    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          This issue could not be deleted
        </AlertDialog.Description>
        <Button color="gray" variant="soft" mt="2" onClick={modifyError}>
          OK
        </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteDialog;
