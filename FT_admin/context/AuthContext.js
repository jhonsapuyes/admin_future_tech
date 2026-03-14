

import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const API_URL = "https://silver-penguin-235702.hostingersite.com/end_points/index.php"; // endpoint login

export function AuthProvider({ children }) {

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarSesion();
  }, []);

  async function cargarSesion() {
    const storedToken = await SecureStore.getItemAsync("token");

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }

  // LOGIN REAL
  async function login(usuario, password) {

    try {

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
          "api": "ft_admin",
          "requestType": "getOne",
          "usuario": usuario,
          "password": password
        })
      });

      const data = await response.json();
      if (data.token) {


        await SecureStore.setItemAsync("token", data.token);
        setToken(data.token);

        return { success: true };

      } else {

        return { success: false, message: data.message };

      }

    } catch (error) {

      return { success: false, message: "Error de conexión" };

    }

  }

  async function logout() {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}



