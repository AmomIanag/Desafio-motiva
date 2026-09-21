import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import ContainerTela from "../components/ContainerTela";
import LogoMarca from "../components/LogoMarca";
import {
  buscarUsuario,
  salvarSessao,
} from "../storage/authStorage";

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erros, setErros] = useState({});
  const [processando, setProcessando] = useState(false);

  function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  async function entrar() {
    if (processando) {
      return;
    }

    const novosErros = {};

    if (!email.trim()) {
      novosErros.email = "E-mail obrigatório";
    } else if (!emailValido(email)) {
      novosErros.email = "Digite um e-mail válido";
    }

    if (!senha) {
      novosErros.senha = "Senha obrigatória";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setProcessando(true);

    try {
      const usuario = await buscarUsuario();

      if (!usuario) {
        setErros({
          geral: "Nenhum usuário cadastrado. Crie uma conta primeiro.",
        });
        setProcessando(false);
        return;
      }

      const emailDigitado = email.trim().toLowerCase();

      if (
        usuario.email !== emailDigitado ||
        usuario.senha !== senha
      ) {
        setErros({
          geral: "E-mail ou senha inválidos",
        });
        setProcessando(false);
        return;
      }

      await salvarSessao(usuario);

      navigation.reset({
        index: 0,
        routes: [{ name: "Principal" }],
      });
    } catch {
      setErros({
        geral: "Não foi possível acessar os dados salvos.",
      });
      setProcessando(false);
    }
  }

  return (
    <ContainerTela>
      <View style={styles.header}>
        <LogoMarca />
      </View>

      <KeyboardAvoidingView
        style={styles.conteudo}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#888888"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              setErros({ ...erros, email: "", geral: "" });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {erros.email ? (
            <Text style={styles.erro}>{erros.email}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888888"
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErros({ ...erros, senha: "", geral: "" });
            }}
            secureTextEntry
          />

          {erros.senha ? (
            <Text style={styles.erro}>{erros.senha}</Text>
          ) : null}

          {erros.geral ? (
            <Text style={styles.erroGeral}>{erros.geral}</Text>
          ) : null}

          <Pressable
            style={[styles.botao, processando && styles.botaoDesabilitado]}
            onPress={entrar}
            disabled={processando}
          >
            <Text style={styles.textoBotao}>
              {processando ? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.link}>Criar uma conta</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ContainerTela>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    backgroundColor: "#5D20F5",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  formulario: {
    width: "80%",
    alignItems: "center",
  },

  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#EDEDED",
    borderRadius: 15,
    paddingHorizontal: 23,
    fontSize: 18,
    color: "#333333",
    elevation: 4,
    marginBottom:18,
  },

  erro: {
    width: "100%",
    color: "#D71920",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 7,
  },

  erroGeral: {
    width: "100%",
    color: "#D71920",
    fontSize: 13,
    textAlign: "center",
    marginTop: 13,
  },

  botao: {
    backgroundColor: "#5D20F5",
    borderRadius: 13,
    minWidth: 121,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },

  botaoDesabilitado: {
    opacity: 0.65,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  link: {
    color: "#5D20F5",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 17,
  },
});
