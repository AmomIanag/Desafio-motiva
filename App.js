import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NavegadorApp from "./src/navegacao/NavegadorApp";
import { OcorrenciasProvider } from "./src/context/OcorrenciasContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        style="light"
        backgroundColor="#5D20F5"
        translucent={false}
      />

      <OcorrenciasProvider>
        <NavegadorApp />
      </OcorrenciasProvider>
    </SafeAreaProvider>
  );
}
