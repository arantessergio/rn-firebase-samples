import * as SecureStore from "expo-secure-store";

export default Persistence = {
  USER_KEY: "USER",
  setItem: SecureStore.setItemAsync,
  getItem: SecureStore.getItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};
