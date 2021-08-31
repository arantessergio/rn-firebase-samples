import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SigninPage, SignupPage, PasswordRecoveryPage } from "../../pages";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Signin" component={SigninPage} />
    <Stack.Screen name="Signup" component={SignupPage} />
    <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryPage} />
  </Stack.Navigator>
);
