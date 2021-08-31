import React from "react";
import { Center, Spinner } from "native-base";

const Loading = () => (
  <Center flex={1}>
    <Spinner size="large" />
  </Center>
);

export default Loading;
