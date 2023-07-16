import React from "react";
import { Stack } from "./Layout";
import { Text } from "./Text";

const Empty = () => {
  return (
    <Stack align_items="center" mt={50}>
      <Text>Não há nada aqui.</Text>
    </Stack>
  );
};

export default Empty;
