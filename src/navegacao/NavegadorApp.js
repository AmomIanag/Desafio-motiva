import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TelaLogin from "../telas/TelaLogin";
import TelaCadastro from "../telas/TelaCadastro";
import DashboardTela from "../telas/DashboardTela";
import TelaMapa from "../telas/TelaMapa";
import AlertasTela from "../telas/AlertasTela";
import ReportsTela from "../telas/ReportsTela";
import DroneImagemTela from "../telas/DroneImagemTela";
import DetalheOcorrenciaTela from "../telas/DetalheOcorrenciaTela";

import TabBar from "../components/TabBar";
import {
  buscarSessao,
  removerSessao,
} from "../storage/authStorage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TelasPrincipais({ navigation }) {
  async function sair() {
    try {
      await removerSessao();

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch {
      Alert.alert(
        "Não foi possível sair",
        "A sessão não pôde ser removida. Tente novamente.",
      );
    }
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard">
        {(props) => (
          <DashboardTela {...props} aoSair={sair} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Mapa">
        {(props) => (
          <TelaMapa {...props} aoSair={sair} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Alertas">
        {(props) => (
          <AlertasTela {...props} aoSair={sair} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Relatorios">
        {(props) => (
          <ReportsTela {...props} aoSair={sair} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function NavegadorApp() {
  const [carregando, setCarregando] = useState(true);
  const [temSessao, setTemSessao] = useState(false);

  useEffect(() => {
    async function verificarSessao() {
      try {
        const sessao = await buscarSessao();
        setTemSessao(Boolean(sessao));
      } catch {
        setTemSessao(false);
      } finally {
        setCarregando(false);
      }
    }

    verificarSessao();
  }, []);

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator
          size="large"
          color="#5D20F5"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={temSessao ? "Principal" : "Login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={TelaLogin}
        />

        <Stack.Screen
          name="Cadastro"
          component={TelaCadastro}
        />

        <Stack.Screen
          name="Principal"
          component={TelasPrincipais}
        />

        <Stack.Screen
          name="DetalheOcorrencia"
          component={DetalheOcorrenciaTela}
        />

        <Stack.Screen
          name="ImagemDrone"
          component={DroneImagemTela}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
