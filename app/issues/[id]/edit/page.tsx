import React from "react";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  return <div>Edit Issue {id}</div>;
};

export default page;
