# Testes manuais — Sprint 3

Ambiente principal de validação: Expo SDK 56, Expo Go e emulador Android Pixel 5 (1080 × 2340). Os dados operacionais foram restaurados ao baseline ao fim dos testes.

## 1. Cadastro e login

- **Cenário:** criação de usuário e autenticação com as mesmas credenciais.
- **Passos:** abrir `Criar uma conta`; preencher nome, e-mail, RM, senha e confirmação; tocar em `Cadastrar`; preencher o login; tocar em `Entrar`.
- **Esperado:** cadastro volta ao Login sem duplicar a rota; login abre o Dashboard.
- **Obtido:** retorno único ao Login e Dashboard aberto com os indicadores do baseline.
- **Status:** **PASSOU**.

## 2. Restauração da sessão

- **Cenário:** sessão autenticada persistida após fechar o aplicativo.
- **Passos:** autenticar; forçar o encerramento do Expo Go; reabrir a URL do projeto.
- **Esperado:** o Dashboard deve abrir sem solicitar novo login.
- **Obtido:** a sessão foi restaurada diretamente no Dashboard.
- **Status:** **PASSOU**.

## 3. Logout

- **Cenário:** encerramento explícito da sessão.
- **Passos:** tocar em `Logout` no cabeçalho.
- **Esperado:** remover somente a sessão e abrir o Login.
- **Obtido:** o Login foi exibido; os patches operacionais permaneceram independentes da sessão.
- **Status:** **PASSOU**.

## 4. Mapa → Detalhe → Drone

- **Cenário:** consulta de uma ocorrência a partir do mapa simulado.
- **Passos:** abrir a aba Mapa; tocar no card do KM 84; tocar em `Ver imagem do drone`.
- **Esperado:** Detalhe busca a ocorrência pelo ID e Drone apresenta sua imagem.
- **Obtido:** as três telas abriram na sequência com os dados da mesma ocorrência.
- **Status:** **PASSOU**.

## 5. Ação operacional e sincronização

- **Cenário:** resolver uma ocorrência crítica em atendimento.
- **Passos:** anotar a contagem do Dashboard; em Alertas, resolver o KM 284; consultar Dashboard, Mapa e Relatórios.
- **Esperado:** a ação altera o domínio compartilhado em todas as telas.
- **Obtido:** críticos abertos mudaram de 3 para 2; Mapa mostrou `Resolvida`; Relatórios mudou para 2 resolvidas, 7 abertas e taxa de 22%.
- **Status:** **PASSOU**.

## 6. Persistência após reinício

- **Cenário:** patch operacional sobrevivendo ao reinício.
- **Passos:** resolver o KM 284; encerrar o Expo Go; reabrir o projeto.
- **Esperado:** a ocorrência continua resolvida e a contagem continua em 2 críticos abertos.
- **Obtido:** Dashboard reabriu com 2 críticos e as demais telas mantiveram o estado.
- **Status:** **PASSOU**.

## 7. Restauração dos dados da demonstração

- **Cenário:** retorno controlado ao baseline.
- **Passos:** em Relatórios, tocar no link discreto de restauração; confirmar; voltar ao Dashboard.
- **Esperado:** remover os patches e recompor o baseline com 3 críticos, 2 em atenção e 3 moderados abertos.
- **Obtido:** Dashboard voltou a exibir 3 críticos; a alteração operacional anterior foi removida.
- **Status:** **PASSOU**.

## 8. Filtros da Central de Alertas

- **Cenário:** acesso aos recortes do domínio.
- **Passos:** abrir Alertas e conferir `Todos`, `Crítico`, `Atenção` e `Resolvido`; selecionar os filtros e consultar as listas.
- **Esperado:** os quatro filtros usam criticidade/status e um filtro sem itens mostra estado vazio.
- **Obtido:** os quatro filtros foram renderizados; os resultados vieram da coleção compartilhada e o fallback vazio está disponível.
- **Status:** **PASSOU**.

## 9. Relatórios derivados

- **Cenário:** indicadores antes e depois de uma resolução.
- **Passos:** abrir Relatórios no baseline; resolver uma ocorrência; abrir novamente; preparar o resumo de conformidade.
- **Esperado:** total, resolvidas, abertas, taxa e distribuição acompanham o domínio; previsão permanece identificada como simulada.
- **Obtido:** os números foram recalculados e a prévia textual foi gerada; o card preditivo exibe `PREVISÃO SIMULADA`.
- **Status:** **PASSOU**.

## 10. Localização negada

- **Cenário:** usuário nega a permissão de localização.
- **Passos:** revogar a permissão no emulador; abrir Mapa; selecionar `Don't allow` no diálogo do Android.
- **Esperado:** informar a negativa sem bloquear o mapa demonstrativo.
- **Obtido:** foi exibido `Localização negada. O mapa demonstrativo continua disponível.` e os cards continuaram acessíveis.
- **Status:** **PASSOU**.

## 11. Domínio vazio

- **Cenário:** cenário determinístico `vazio` em `CENARIO_MOCK_ATIVO`.
- **Passos:** alterar temporariamente o cenário para `vazio`; aguardar o Fast Refresh; abrir Dashboard.
- **Esperado:** não ocorrer crash e aparecer orientação de ausência de dados.
- **Obtido:** Dashboard exibiu `Nenhuma ocorrência` e `Não há trechos monitorados neste cenário.`.
- **Status:** **PASSOU**.

## 12. Erro de hidratação e retry

- **Cenário:** cenário determinístico `erro` em `CENARIO_MOCK_ATIVO`.
- **Passos:** ativar temporariamente `erro`; aguardar a falha inicial; tocar em `Tentar novamente`.
- **Esperado:** mostrar erro recuperável e carregar no retry.
- **Obtido:** a mensagem de erro e o botão foram exibidos; o retry recuperou os 3 críticos sem reiniciar o app.
- **Status:** **PASSOU**.

## 13. Falha de persistência

- **Cenário:** erro determinístico ao gravar uma transição operacional.
- **Passos:** alterar temporariamente `SIMULAR_FALHA_PERSISTENCIA` para `true`; tocar em `Enviar equipe` no KM 84.
- **Esperado:** manter o status anterior, apresentar erro e não mostrar falso sucesso.
- **Obtido:** foi exibido `Não foi possível salvar a alteração. Tente novamente.` e nenhuma mensagem de sucesso; o flag foi devolvido a `false`.
- **Status:** **PASSOU**.

## 14. Parâmetro de ocorrência inválido

- **Cenário:** Detalhe ou Drone recebe ID ausente/inexistente.
- **Passos:** revisar o acesso a `route.params?.ocorrenciaId` e o retorno quando o seletor não encontra a ocorrência.
- **Esperado:** fallback seguro, sem desestruturar parâmetros ausentes.
- **Obtido:** ambas as telas possuem estado `Ocorrência não encontrada` e ação de retorno; validação por inspeção e exportação do bundle.
- **Status:** **PASSOU**.

## 15. PDF

- **Cenário:** geração de documento PDF real.
- **Passos:** não executado, pois o bloco era opcional e exigiria novas dependências nativas.
- **Esperado:** manter Relatórios funcional mesmo sem PDF.
- **Obtido:** prévia de conformidade funcional; PDF real registrado para a Sprint 4.
- **Status:** **NÃO APLICÁVEL NESTA SPRINT**.
