# Documento de Especificação de Requisitos e Persona

> **Projeto:** Motiva Challenge — Monitoramento Inteligente de Vegetação  
> **Contexto:** Challenge CCR / Concessionária Motiva  
> **Sprint:** 3 — Protótipo Funcional Completo

---

## 1. Objetivo do documento

Este documento consolida os requisitos funcionais, não funcionais, persona e restrições técnicas da versão entregue na Sprint 3.

A Sprint 3 evolui o protótipo das etapas anteriores para uma aplicação mobile funcional, com fluxos integrados, dados mockados compartilhados, persistência local e estados alternativos de uso.

O projeto utiliza dados simulados e **não depende de APIs externas, drones reais, satélites reais ou backend** para sua demonstração.

---

## 2. Persona detalhada

### Roberto Silva (42 anos) — Supervisor de Conservação Rodoviária

**Perfil e background:** técnico em edificações com 15 anos de experiência em infraestrutura rodoviária. Lidera frentes de trabalho terceirizadas responsáveis por capina, roçagem, drenagem e limpeza de sinalizações nas rodovias administradas pela Motiva.

**Rotina de trabalho:** inicia o turno analisando ocorrências e prioridades operacionais. Parte significativa de sua rotina envolve acompanhamento de trechos, confirmação de riscos e distribuição das equipes de manutenção.

**Relação com a tecnologia:** usuário intermediário. Utiliza smartphone Android corporativo para comunicação e tarefas operacionais. Valoriza interfaces rápidas, diretas e com pouca complexidade.

### Frustrações atuais

- enviar equipes de poda para trechos que ainda não necessitam de intervenção;
- identificar tarde demais placas encobertas ou pontos críticos;
- receber informações operacionais fragmentadas;
- ter dificuldade para priorizar ocorrências;
- depender excessivamente de inspeções visuais presenciais;
- perder tempo consultando fontes distintas para acompanhar uma ocorrência.

### Objetivos com a solução

- identificar rapidamente quais trechos possuem maior criticidade;
- visualizar a situação de uma ocorrência;
- consultar evidências visuais;
- acionar ou programar equipes;
- acompanhar o status operacional;
- confirmar quais ocorrências já foram resolvidas;
- consultar indicadores consolidados.

---

## 3. Escopo funcional da Sprint 3

O aplicativo entregue possui um domínio único de ocorrências utilizado por Dashboard, Mapa, Alertas, Detalhe, Drone e Relatórios.

Cada ocorrência diferencia dois conceitos:

### Criticidade

- `critico`
- `atencao`
- `moderado`

### Status operacional

- `nova`
- `agendada`
- `equipe_enviada`
- `em_atendimento`
- `resolvida`

A criticidade representa a gravidade da ocorrência. O status representa a etapa operacional do atendimento.

---

## 4. Requisitos funcionais (RF)

### RF-001 — Cadastro de usuário

O aplicativo deve permitir o cadastro local de um usuário com:

- nome;
- e-mail;
- RM;
- senha;
- confirmação de senha.

### RF-002 — Validação de cadastro

O aplicativo deve validar:

- preenchimento de campos obrigatórios;
- formato de e-mail;
- senha;
- confirmação de senha.

Os erros devem ser apresentados de forma inline.

### RF-003 — Autenticação

O aplicativo deve permitir login somente com credenciais previamente cadastradas localmente.

### RF-004 — Persistência da sessão

O aplicativo deve manter a sessão válida após o fechamento e a reabertura da aplicação.

### RF-005 — Logout

O usuário deve conseguir encerrar sua sessão.

O logout deve remover a sessão do usuário sem apagar os estados operacionais das ocorrências.

### RF-006 — Dashboard operacional

O Dashboard deve exibir as quantidades de ocorrências abertas por criticidade:

- Crítico;
- Atenção;
- Moderado.

Os indicadores devem ser derivados do domínio compartilhado e não de valores hardcoded.

### RF-007 — Indicador sazonal

O Dashboard deve apresentar um indicador climático/sazonal simulado para contextualizar o ritmo de crescimento da vegetação.

### RF-008 — Ocorrência em destaque

O Dashboard deve apresentar uma ocorrência monitorada em destaque e permitir navegar para seus detalhes.

### RF-009 — Mapa de monitoramento

O aplicativo deve apresentar um mapa **simulado** de monitoramento e uma lista de ocorrências em destaque.

O mapa não precisa utilizar uma biblioteca cartográfica ou serviço externo nesta Sprint.

### RF-010 — Permissão de localização

O aplicativo deve solicitar permissão para acesso à localização do dispositivo.

Caso a permissão seja negada ou ocorra erro, o mapa demonstrativo deve continuar disponível.

### RF-011 — Detalhe da ocorrência

O usuário deve conseguir abrir uma ocorrência e visualizar:

- rodovia;
- KM;
- título;
- descrição;
- criticidade;
- status;
- origem;
- data;
- equipe, quando aplicável;
- imagem associada.

### RF-012 — Visualização da imagem do drone

O usuário deve poder abrir a imagem associada a uma ocorrência.

A tela deve apresentar fallback seguro quando o identificador ou a imagem estiver indisponível.

### RF-013 — Central de alertas

O aplicativo deve apresentar uma central com as ocorrências operacionais.

### RF-014 — Filtros de alertas

O usuário deve conseguir filtrar ocorrências por situações relevantes, incluindo:

- Todos;
- Crítico;
- Atenção;
- Resolvido.

### RF-015 — Agendamento de equipe

Uma ocorrência em atenção deve permitir o agendamento da equipe conforme o fluxo definido no aplicativo.

### RF-016 — Envio de equipe

Uma ocorrência crítica deve permitir o acionamento de equipe.

### RF-017 — Início de atendimento

Uma ocorrência com equipe enviada deve permitir evolução para o estado de atendimento.

### RF-018 — Resolução de ocorrência

Uma ocorrência em atendimento deve poder ser marcada como resolvida.

Uma ocorrência resolvida não deve executar novamente ações operacionais incompatíveis.

### RF-019 — Sincronização entre telas

Alterações realizadas em uma ocorrência devem ser refletidas em:

- Dashboard;
- Mapa;
- Alertas;
- Relatórios;
- Detalhe.

### RF-020 — Persistência operacional

Alterações de status e dados de equipe devem permanecer disponíveis após o aplicativo ser fechado e reaberto.

### RF-021 — Relatórios operacionais

A tela de Relatórios deve apresentar métricas derivadas do domínio de ocorrências, incluindo indicadores como:

- total;
- abertas;
- resolvidas;
- taxa de resolução;
- distribuição por criticidade.

### RF-022 — Indicadores simulados

Indicadores estratégicos que não possam ser derivados dos mocks operacionais podem continuar simulados, desde que sejam identificados como tal.

### RF-023 — Prévia de conformidade

A tela de Relatórios deve preparar uma prévia funcional de relatório de conformidade com os dados atuais.

A geração real de arquivo PDF não é requisito desta Sprint.

### RF-024 — Estados alternativos

O aplicativo deve possuir estados para:

- carregamento;
- sucesso;
- vazio;
- erro;
- retry;
- ocorrência inexistente;
- permissão de localização negada.

### RF-025 — Restauração do cenário de demonstração

O aplicativo deve possuir uma forma controlada de restaurar o baseline dos dados mockados para testes e demonstração.

---

## 5. Requisitos não funcionais (RNF)

### RNF-001 — Multiplataforma

O aplicativo deve ser desenvolvido em **React Native + Expo**, mantendo uma única base de código compatível com Android e iOS.

A validação principal da Sprint é realizada em Android.

### RNF-002 — Tecnologia

O projeto deve utilizar JavaScript.

Não faz parte do escopo da Sprint migrar para TypeScript ou Flutter.

### RNF-003 — Usabilidade

A interface deve ser simples, rápida e adequada ao contexto de um supervisor rodoviário.

### RNF-004 — Identidade visual

A aplicação deve preservar a identidade Motiva:

- roxo institucional;
- fundo claro;
- vermelho para criticidade crítica;
- amarelo/âmbar para atenção;
- verde para moderado/resolvido, com distinção visual entre os dois;
- cards arredondados;
- navegação inferior.

### RNF-005 — Consistência visual

A interface deve utilizar componentes e padrões reutilizáveis para:

- criticidade;
- status;
- feedback;
- botões;
- campos de formulário;
- cards de ocorrência.

### RNF-006 — Responsividade

O conteúdo não deve cortar ações importantes em diferentes alturas de tela.

Telas com maior volume de conteúdo devem possuir rolagem apropriada.

### RNF-007 — Dispositivo de validação

O aplicativo deve funcionar no emulador Android Pixel 5 utilizado durante o desenvolvimento.

### RNF-008 — Dados mockados

A aplicação deve funcionar sem APIs externas.

O baseline de dados deve ser local e determinístico para permitir uma demonstração estável.

### RNF-009 — Persistência

Cadastro, sessão e alterações operacionais relevantes devem utilizar armazenamento local.

### RNF-010 — Robustez

Parâmetros inválidos, erros de hidratação, falha simulada de persistência e localização negada não devem causar crash.

### RNF-011 — Segurança acadêmica

O uso de AsyncStorage para credenciais é permitido somente para fins acadêmicos.

Em produção, senhas devem ser protegidas por mecanismos adequados de autenticação e armazenamento seguro.

### RNF-012 — Desempenho de demonstração

Os dados simulados devem ser carregados em tempo compatível com uma demonstração fluida, sem dependência de rede.

### RNF-013 — Legibilidade

A interface deve:

- evitar textos excessivamente pequenos;
- manter contraste adequado;
- não depender apenas da cor para diferenciar estados;
- manter áreas de toque adequadas nas ações principais.

---

## 6. Regras de negócio

### RN-001 — Criticidade e status são independentes

Resolver uma ocorrência não altera sua criticidade original.

Exemplo:

```text
criticidade = critico
status = resolvida
```

### RN-002 — Indicadores do Dashboard

As contagens do Dashboard consideram as ocorrências abertas por criticidade.

Uma ocorrência crítica resolvida deixa de ser contabilizada como crítica aberta.

### RN-003 — Fluxo operacional

As transições devem respeitar o fluxo previsto:

```text
nova
→ agendada ou equipe_enviada
→ em_atendimento
→ resolvida
```

O fluxo exato depende da criticidade e da ação disponível.

### RN-004 — Ocorrência resolvida

Ocorrências resolvidas podem ser consultadas, mas não devem aceitar ações incompatíveis.

### RN-005 — Estado compartilhado

Nenhuma tela deve manter uma cópia independente do domínio operacional.

### RN-006 — Persistência por patches

Somente alterações operacionais devem ser persistidas.

Imagens locais e a coleção-base não devem ser serializadas no AsyncStorage.

### RN-007 — Logout

Logout encerra a sessão, mas não restaura as ocorrências.

### RN-008 — Baseline

A restauração do cenário de demonstração deve retornar os dados ao baseline definido nos mocks.

---

## 7. Baseline de dados da demonstração

O cenário padrão da Sprint 3 possui 9 ocorrências:

- 3 críticas abertas;
- 2 em atenção abertas;
- 3 moderadas abertas;
- 1 crítica resolvida.

O baseline é mantido em `src/data/mockData.js`.

As alterações realizadas durante a execução são aplicadas por patches persistidos.

---

## 8. Requisitos de dados simulados

Os mocks devem cobrir:

- caminho de sucesso;
- criticidade crítica;
- criticidade atenção;
- criticidade moderada;
- ocorrência resolvida;
- equipe agendada;
- equipe enviada;
- ocorrência em atendimento;
- estado vazio;
- estado de erro;
- falha de persistência para QA;
- ocorrência inválida;
- permissão de localização negada.

---

## 9. Restrições técnicas

### RT-001 — Sem backend nesta Sprint

A Sprint 3 não possui backend ou banco de dados.

O aplicativo deve executar com dados locais mockados.

### RT-002 — Sem dependência de conexão externa

A aplicação não deve depender de internet para carregar o domínio de demonstração.

Serviços de satélite, drones e análise inteligente representam a arquitetura conceitual futura, não integrações reais da Sprint 3.

### RT-003 — Mapa simulado

O mapa da Sprint 3 é representado por asset local.

Não existe integração com Google Maps, Mapbox ou serviço equivalente.

### RT-004 — Imagens de drone simuladas

As imagens utilizadas são assets locais associados às ocorrências.

Não existe integração real com Drone-in-a-Box nesta versão.

### RT-005 — Localização

`Expo Location` é utilizado para solicitar permissão do dispositivo, mas o funcionamento do mapa demonstrativo não depende da localização real.

### RT-006 — Inteligência e previsão simuladas

A previsão exibida em Relatórios não é resultado de um modelo real de machine learning.

Ela deve permanecer identificada como simulada.

### RT-007 — PDF fora do escopo

A Sprint 3 apresenta uma prévia de conformidade dentro do aplicativo.

A geração real de PDF permanece como evolução futura.

---

## 10. Arquitetura técnica

```text
src/data/mockData.js
        │
        ▼
OcorrenciasContext + useReducer
        │
        ├── ações operacionais
        ├── hidratação
        ├── persistência
        └── feedback
        │
        ▼
ocorrenciaSelectors.js
        │
        ├── Dashboard
        ├── Mapa
        ├── Alertas
        ├── Detalhe
        └── Relatórios
```

### Persistência

A persistência operacional utiliza `AsyncStorage`.

Formato conceitual:

```json
{
  "versao": 1,
  "alteracoes": {
    "occ-084": {
      "status": "resolvida",
      "resolvidaEm": "data",
      "equipe": {}
    }
  }
}
```

O baseline é combinado com os patches ao iniciar a aplicação.

---

## 11. Fluxos principais

### Fluxo 1 — Autenticação

```text
Cadastro
→ Login
→ Dashboard
```

### Fluxo 2 — Inspeção

```text
Mapa
→ Detalhe da ocorrência
→ Imagem do drone
```

### Fluxo 3 — Atendimento

```text
Alertas
→ Agendar/Enviar equipe
→ Iniciar atendimento
→ Resolver
```

### Fluxo 4 — Sincronização

```text
Ação em Alertas
→ Dashboard atualizado
→ Mapa atualizado
→ Relatórios atualizados
```

### Fluxo 5 — Persistência

```text
Alterar ocorrência
→ fechar aplicativo
→ reabrir
→ alteração permanece
```

### Fluxo 6 — Relatórios

```text
Ocorrências
→ métricas derivadas
→ prévia de conformidade
```

---

## 12. Critérios de aceite da Sprint 3

A versão é considerada adequada quando:

- todos os fluxos principais são navegáveis;
- autenticação permanece funcional;
- Dashboard não utiliza contagens operacionais hardcoded;
- telas utilizam o mesmo domínio de ocorrências;
- criticidade e status são independentes;
- ações são refletidas entre telas;
- persistência sobrevive ao reinício;
- estados de loading, vazio e erro estão disponíveis;
- localização negada não bloqueia o mapa simulado;
- parâmetros inválidos não causam crash;
- listas possuem rolagem quando necessária;
- identidade Motiva é preservada;
- dados mockados cobrem diferentes cenários;
- testes manuais estão documentados;
- o aplicativo pode ser demonstrado no Pixel 5 sem erro crítico.

---

## 13. Testes e pendências

Os testes manuais da Sprint estão documentados em:

```text
docs/TESTES_MANUAIS.md
```

As evoluções planejadas para a Sprint 4 estão documentadas em:

```text
docs/PENDENCIAS_SPRINT_4.md
```

Entre as possíveis evoluções:

- backend e APIs reais;
- banco de dados;
- mapa real;
- dados reais de satélite/drone;
- autenticação segura;
- geração real de PDF;
- testes automatizados;
- evolução da análise inteligente.

---

## 14. Observações finais

O aplicativo entregue na Sprint 3 é uma aplicação mobile funcional baseada em mocks locais e projetada para demonstrar a jornada operacional completa.

Os componentes de satélite, drones e inteligência artificial representam o ecossistema conceitual da solução, mas não são integrações reais nesta entrega.

A prioridade desta Sprint é a estabilidade dos fluxos, consistência dos dados, experiência de uso e preparação para a evolução futura.
