

import { useContext, useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";

export default function LoginScreen() {

  const { login } = useContext(AuthContext);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);

  async function handleLogin() {
    const result = await login(usuario, password);

    if (!result.success) {
      Alert.alert("Error", result.message);
    }

  }

  return (
    <View style={{ padding: 20 }}>

      <Text>Usuario</Text>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Password</Text>


            <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, marginBottom: 20 }}>
        
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!verPassword}
          style={{ flex: 1, padding: 10 }}
        />

        <TouchableOpacity
          onPress={() => setVerPassword(!verPassword)}
          style={{ padding: 10 }}
        >
          <Text>{verPassword ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>

      </View>

      <Button
        title="Iniciar sesión"
        onPress={handleLogin}
      />

    </View>
  );
}

