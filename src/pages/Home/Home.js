import React from "react";
import { Center, Button, Text } from "native-base";
import { useAuth } from "../../hooks";

const HomePage = ({ navigation }) => {
  const { logout } = useAuth();

  return (
    <Center flex={1} padding={5}>
      <Text fontSize={22} mb={5}>
        Hello details page
      </Text>
      <Button w="100%" mb={5} onPress={() => navigation.navigate("Details")}>
        Go to details
      </Button>
      <Button w="100%" onPress={logout} variant="outline">
        Logout
      </Button>
    </Center>
  );
};

export default HomePage;
