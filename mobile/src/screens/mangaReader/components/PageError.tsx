import React from "react";
import { Stack } from "src/components/Layout";
import RefreshInError from "src/components/RefreshInError";

type Props = {
  refresh: () => void;
};

const PageError = ({ refresh }: Props) => {
  return (
    <Stack
      flex={1}
      justify_content="center"
      align_items="center"
      style={{ backgroundColor: "black" }}
    >
      <RefreshInError refresh={refresh} />
    </Stack>
  );
};

export default PageError;
