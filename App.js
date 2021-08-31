import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { MainNavigator } from "./src/routes";
import { AuthProvider } from "./src/hooks";
import { firebaseConfig } from "./src/config";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp(firebaseConfig);

const App = () => (
  <NavigationContainer>
    <NativeBaseProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </NativeBaseProvider>
  </NavigationContainer>
);

export default App;
