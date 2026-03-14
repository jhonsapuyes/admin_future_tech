

import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";

export default function HomeScreen() {

  const { logout, token } = useContext(AuthContext);

  return (
    <View>

      <Text>Usuario autenticado</Text>
      <Text>{token}</Text>

      <Button
        title="Cerrar sesión"
        onPress={logout}
      />

    </View>
  );
}