# Pendências e situação técnica — Sprint 4

Esta lista diferencia o que já foi preparado no código do que ainda depende do APK, de contas externas ou de validação humana. A Sprint 4 não deve ser considerada concluída enquanto o APK final não for instalado e aprovado.

## Preparado no código

1. **Filtros:** indicador e filtro `Moderado` implementados; reaplicação do mesmo filtro tratada.
2. **Robustez operacional:** bloqueio síncrono contra duplo acionamento muito rápido.
3. **PDF real:** geração local e compartilhamento implementados com `expo-print` e `expo-sharing`; validação nativa ainda pendente.
4. **Testes automatizados:** suíte mínima para seletores, transições, patches e HTML do relatório.
5. **Identidade Android:** ícones e splash derivados do símbolo Motiva existente.
6. **Configuração Android:** nome, package proposto, `versionCode` e backup configurados.
7. **EAS:** perfil `preview` preparado para gerar APK de distribuição interna.

## Obrigatório antes da entrega

1. Confirmar humanamente o package acadêmico `com.amomianag.motivachallenge` antes do primeiro build assinado.
2. Associar o projeto à conta Expo e registrar o `projectId` real gerado pelo EAS.
3. Gerar o APK assinado sem development client.
4. Instalar o APK e repetir os fluxos críticos descritos em `docs/TESTES_MANUAIS.md`.
5. Validar PDF e compartilhamento no Android instalado.
6. Validar ícone, máscara adaptativa, ícone temático e splash no build.
7. Publicar o APK como asset de uma GitHub Release, sem adicioná-lo ao repositório.
8. Produzir plano de negócio, vídeo e README final com links reais.

## Recomendado

- validar leitor de tela, escala de fonte, contraste e um segundo tamanho de dispositivo;
- registrar a triagem dos avisos transitivos do `npm audit` a cada atualização do lockfile;
- testar atualização do aplicativo preservando patches e sessão;
- revisar textos operacionais e datas com usuários da persona acadêmica.

## Opcional após a entrega

- implementar migrações entre versões futuras da persistência; atualmente patches incompatíveis são descartados de forma controlada;
- ampliar testes para componentes e navegação;
- criar uma fila de repetição para falhas reais de escrita.

## Evoluções fora do protótipo atual

- O mapa continua propositalmente simulado. Um mapa real exigiria escolha de provedor, custos, chaves e política de privacidade.
- Satélites, drones, visão computacional e previsão por IA continuam conceituais/mocados.
- Não há backend, banco ou autenticação de produção. Se o projeto deixar de ser acadêmico, senha e sessão devem sair do armazenamento local simples e usar uma arquitetura segura no servidor.
- Não há sincronização multiusuário nem auditoria histórica de ações.

## Riscos conhecidos

- AsyncStorage é adequado à demonstração offline, mas não é um cofre para credenciais.
- Somente dados e credenciais fictícios devem ser usados no protótipo.
- Uma falha real de escrita mantém a ocorrência anterior e informa erro, porém não há fila de repetição automática.
- A alternância `CENARIO_MOCK_ATIVO` é intencionalmente manual e voltada a QA; não existe seletor de cenários na interface final.
- A auditoria npm ainda contém avisos transitivos em dependências do Expo, React Native e React Navigation; não foi demonstrada exploração no aplicativo e correções forçadas permanecem proibidas.
- Após o alinhamento compatível com o SDK 56, `npm audit --omit=dev` registra 12 avisos: 1 crítico, 8 altos e 3 moderados. Os avisos permanecem transitivos, exceto a marcação do pacote `expo` causada por sua cadeia de CLI.
- O Expo Doctor aprova 21 de 22 verificações. O alerta restante é a regressão de memória do Hermes V1 incluído no React Native 0.85.3; a correção indicada pela ferramenta exige Expo SDK 57, fora do escopo de estabilidade desta Sprint.

