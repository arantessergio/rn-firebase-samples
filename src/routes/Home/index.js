import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage, DetailsPage } from "../../pages";

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen name="Details" component={DetailsPage} />
  </Stack.Navigator>
);
