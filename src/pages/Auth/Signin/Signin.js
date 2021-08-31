import React, { useState } from "react";
import { Center, Input, Button, Link, useToast } from "native-base";
import { useAuth } from "../../../hooks";

const SigninPage = ({ navigation }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();

  const { signin, loading } = useAuth();

  const handleChange = (key, value) => setForm((x) => ({ ...x, [key]: value }));

  const handleSignin = async () => {
    const { email, password } = form;

    await signin({ email, password, toast, navigation });
  };

  return (
    <Center flex={1} padding={10}>
      <Input
        w="100%"
        mx={3}
        mb={5}
        placeholder="Email"
        keyboardType="email-address"
        type="email"
        onChangeText={(value) => handleChange("email", value)}
      />
      <Input
        w="100%"
        mx={3}
        mb={10}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(value) => handleChange("password", value)}
      />
      <Button onPress={handleSignin} w="100%" isLoading={loading}>
        Entrar
      </Button>
      <Link
        mt={4}
        fontSize="xl"
        isUnderlined
        onPress={() => navigation.navigate("Signup")}
      >
        Criar conta
      </Link>
      <Link
        mt={4}
        fontSize="xl"
        isUnderlined
        onPress={() => navigation.navigate("PasswordRecovery")}
      >
        Esqueci minha senha
      </Link>
    </Center>
  );
};

export default SigninPage;
