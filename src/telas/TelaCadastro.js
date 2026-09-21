import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import CampoTexto from "../components/CampoTexto";
import ContainerTela from "../components/ContainerTela";
import FeedbackBanner from "../components/FeedbackBanner";
import HeaderApp from "../components/HeaderApp";
import PrimaryButton from "../components/PrimaryButton";
import { salvarUsuario } from "../storage/authStorage";
import { colors, spacing, typography } from "../theme";

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [rm, setRm] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("sucesso");
  const [processando, setProcessando] = useState(false);
  const timerNavegacao = useRef(null);

  useEffect(
    () => () => {
      if (timerNavegacao.current) {
        clearTimeout(timerNavegacao.current);
      }
    },
    [],
  );

  function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  async function cadastrar() {
    if (processando) {
      return;
    }

    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = "Nome obrigatório";
    }

    if (!email.trim()) {
      novosErros.email = "E-mail obrigatório";
    } else if (!emailValido(email)) {
      novosErros.email = "Digite um e-mail válido";
    }

    if (!rm.trim()) {
      novosErros.rm = "RM obrigatório";
    }

    if (!senha) {
      novosErros.senha = "Senha obrigatória";
    } else if (senha.length < 6) {
      novosErros.senha = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!confirmarSenha) {
      novosErros.confirmarSenha = "Confirmação de senha obrigatória";
    } else if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não são iguais";
    }

    setErros(novosErros);
    setMensagem("");

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setProcessando(true);

    const usuario = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      rm: rm.trim(),
      senha,
    };

    try {
      await salvarUsuario(usuario);

      setTipoMensagem("sucesso");
      setMensagem("Cadastro realizado com sucesso!");

      timerNavegacao.current = setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }
      }, 700);
    } catch {
      setTipoMensagem("erro");
      setMensagem("Não foi possível salvar o cadastro.");
      setProcessando(false);
    }
  }

  function voltarParaLogin() {
    if (timerNavegacao.current) {
      clearTimeout(timerNavegacao.current);
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
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
          <Text style={styles.titulo}>Criar conta</Text>
          <Text style={styles.subtitulo}>
            Preencha os dados para acessar o monitoramento
          </Text>

          <CampoTexto
            label="Nome"
            placeholder="Nome"
            value={nome}
            onChangeText={(texto) => {
              setNome(texto);
              setErros({ ...erros, nome: "" });
            }}
            erro={erros.nome}
          />

          <CampoTexto
            label="E-mail"
            placeholder="E-mail"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              setErros({ ...erros, email: "" });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            erro={erros.email}
          />

          <CampoTexto
            label="RM"
            placeholder="RM"
            value={rm}
            onChangeText={(texto) => {
              setRm(texto);
              setErros({ ...erros, rm: "" });
            }}
            keyboardType="numeric"
            erro={erros.rm}
          />

          <CampoTexto
            label="Senha"
            placeholder="Senha"
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErros({ ...erros, senha: "" });
            }}
            secureTextEntry
            erro={erros.senha}
          />

          <CampoTexto
            label="Confirmar senha"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChangeText={(texto) => {
              setConfirmarSenha(texto);
              setErros({ ...erros, confirmarSenha: "" });
            }}
            secureTextEntry
            erro={erros.confirmarSenha}
          />

          <FeedbackBanner mensagem={mensagem} tipo={tipoMensagem} />

          <PrimaryButton onPress={cadastrar} disabled={processando}>
            {processando ? "Salvando..." : "Cadastrar"}
          </PrimaryButton>

          <Pressable
            onPress={voltarParaLogin}
            disabled={processando}
            style={({ pressed }) => [
              styles.linkArea,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={styles.link}>Já tenho uma conta</Text>
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
