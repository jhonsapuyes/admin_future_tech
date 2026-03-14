import { useContext } from "react";
import { Text } from "react-native";
import { AuthContext } from "../../context/AuthContext.js";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";

export default function Main() {

  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <Text>Cargando sesión...</Text>;
  }

  if (!token) {
    return <LoginScreen />;
  }

  return <HomeScreen />;
}





