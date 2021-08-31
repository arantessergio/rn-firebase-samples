import React, { useState } from "react";
import { Center, Input, Button, useToast } from "native-base";
import firebase from "firebase";

const SignupPage = ({ navigation }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();

  const handleChange = (key, value) => setForm((x) => ({ ...x, [key]: value }));

  const handleSubmit = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password);

      toast.show({
        description: "Sua conta foi criada com sucesso",
        status: "success",
      });
    } catch (error) {
      const { message, code } = error;

      console.log(error.code);

      toast.show({
        description: "Ocorreu um erro ao tentar criar a sua conta.",
        status: "error",
      });
    }
  };

  return (
    <Center padding={10} flex={1}>
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
      <Button onPress={handleSubmit} w="100%">
        Entrar
      </Button>
    </Center>
  );
};

export default SignupPage;
