import React, { useState } from "react";
import { Center, Input, Button, useToast } from "native-base";
import { useAuth } from "../../../hooks";

const PasswordRecoveryPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const { requestPasswordRecovery } = useAuth();

  return (
    <Center padding={10} flex={1}>
      <Input
        w="100%"
        mx={3}
        mb={5}
        placeholder="Email"
        keyboardType="email-address"
        type="email"
        onChangeText={setEmail}
      />
      <Button
        w="100%"
        onPress={() => requestPasswordRecovery({ email, toast })}
      >
        Enviar
      </Button>
    </Center>
  );
};

export default PasswordRecoveryPage;
