import React, { useState } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import CampoTexto from "../components/CampoTexto";
import ContainerTela from "../components/ContainerTela";
import FeedbackBanner from "../components/FeedbackBanner";
import HeaderApp from "../components/HeaderApp";
import PrimaryButton from "../components/PrimaryButton";
import {
  buscarUsuario,
  salvarSessao,
} from "../storage/authStorage";
import { colors, spacing, typography } from "../theme";

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
    <ContainerTela style={styles.fundoAuth}>
      <HeaderApp />

      <KeyboardAvoidingView
        style={styles.area}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titulo}>Entrar</Text>
          <Text style={styles.subtitulo}>
            Acesse o monitoramento operacional
          </Text>

          <CampoTexto
            label="E-mail"
            placeholder="E-mail"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              setErros({ ...erros, email: "", geral: "" });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            erro={erros.email}
          />

          <CampoTexto
            label="Senha"
            placeholder="Senha"
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErros({ ...erros, senha: "", geral: "" });
            }}
            secureTextEntry
            erro={erros.senha}
          />

          <FeedbackBanner mensagem={erros.geral} tipo="erro" />

          <PrimaryButton onPress={entrar} disabled={processando}>
            {processando ? "Entrando..." : "Entrar"}
          </PrimaryButton>

          <Pressable
            onPress={() => navigation.navigate("Cadastro")}
            style={({ pressed }) => [
              styles.linkArea,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={styles.link}>Criar uma conta</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ContainerTela>
  );
}

const styles = StyleSheet.create({
  fundoAuth: {
    backgroundColor: colors.surface,
  },
  area: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  titulo: {
    ...typography.title,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitulo: {
    ...typography.body,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  linkArea: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  link: {
    ...typography.body,
    color: colors.brand,
    fontWeight: "600",
  },
  pressionado: {
    opacity: 0.8,
  },
});
