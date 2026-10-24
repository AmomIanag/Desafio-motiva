# Plano de Negócio — Motiva Challenge
## Monitoramento Inteligente de Vegetação

**Challenge FIAP | Cross Platform Development — Sprint 4 | Outubro de 2026**  
**Natureza da proposta:** modelo de negócio acadêmico para uma solução em estágio de protótipo, não uma oferta comercial em operação.

---

## 1. Resumo executivo

O **Motiva Challenge — Monitoramento Inteligente de Vegetação** propõe uma plataforma B2B para apoiar a identificação, priorização e gestão de ocorrências de vegetação ao longo de rodovias. A solução pretende transformar registros dispersos de inspeção em um fluxo operacional rastreável: localizar uma ocorrência, visualizar evidências, avaliar sua criticidade, programar atendimento, acompanhar o status e produzir relatórios.

A oportunidade está em apoiar concessionárias na manutenção preventiva de trechos viários, sobretudo quando a vegetação pode comprometer a visibilidade de placas, a segurança de usuários, a inspeção de estruturas e a drenagem superficial. A **Motiva**, referência do Challenge, informa administrar aproximadamente **5.044 km de rodovias** no Brasil; esse número demonstra a escala potencial do contexto operacional, **não** representa mercado contratado ou acessível automaticamente pelo projeto [1].

A proposta comercial futura é uma **licença recorrente de software com implantação e serviços opcionais**, inicialmente validada por meio de um piloto supervisionado. A solução não substitui inspeções profissionais, decisões técnicas de manutenção nem exigências regulatórias.

> **Transparência sobre a maturidade:** o aplicativo atual é um protótipo acadêmico funcional, com cadastro/login local, dashboard, mapa demonstrativo, detalhe da ocorrência, imagens ilustrativas de drone, central de alertas, atualização de status, persistência local e geração de relatório PDF. **Ocorrências, mapa, imagens, previsão e indicadores estratégicos são simulados.** Não existe, nesta versão, integração real com drones, satélites, backend corporativo ou inteligência artificial de detecção em produção.

## 2. Problema e oportunidade

O crescimento da vegetação próxima à infraestrutura viária exige inspeção, registro e manutenção recorrentes. Quando a informação é distribuída entre vistorias, planilhas, mensagens e sistemas separados, podem surgir dificuldades para:

- identificar trechos que merecem avaliação prioritária;
- registrar evidências consistentes de uma ocorrência;
- diferenciar **criticidade** de **estágio de atendimento**;
- acompanhar equipes, responsáveis e pendências;
- consolidar indicadores para planejamento e prestação de contas.

A hipótese de negócio é que um fluxo digital único, com dados georreferenciados e inspeção assistida por imagens quando disponível, possa reduzir retrabalho administrativo e acelerar decisões de manutenção. A magnitude desse benefício **precisa ser medida em piloto**, com dados reais e comparação com o processo atual.

## 3. Proposta de valor

**Para gestores de manutenção:** visão consolidada das ocorrências, priorização por criticidade e histórico operacional para planejamento de serviços.

**Para analistas e centros de operação:** um painel único para consultar localização, evidências, status e indicadores, com filtros e relatórios compartilháveis.

**Para equipes de campo:** registros claros da ocorrência e do andamento do atendimento, reduzindo ambiguidades no repasse de informações.

**Para a concessionária:** maior rastreabilidade, base para decisões preventivas e possibilidade futura de integrar dados de inspeção por drones, satélites e modelos computacionais, sempre com validação humana.

**Diferencial central:** a proposta combina **evidência visual + criticidade + fluxo de tratamento + indicadores** em uma experiência móvel simples. A vantagem competitiva precisa ser demonstrada frente a softwares de manutenção e gestão de ativos já existentes; não se pressupõe exclusividade tecnológica.

## 4. Produto: capacidade atual e visão futura

| Eixo | Protótipo da Sprint 4 | Produto comercial proposto |
|---|---|---|
| Ocorrências | Base de dados demonstrativa, filtros e detalhes | Ingestão de registros reais e histórico auditável |
| Localização | Mapa ilustrativo e permissão de localização não bloqueante | Mapa georreferenciado e integração GIS |
| Imagens | Imagens de drone/satélite ilustrativas | Evidências licenciadas, georreferenciadas e autorizadas |
| Priorização | Criticidade definida nos mocks | Regras auditáveis e modelos de apoio à triagem validados |
| Operação | Alteração de status e sincronização local | Ordens de serviço, responsáveis, SLA e integrações |
| Relatórios | Métricas dos dados locais e exportação PDF | Relatórios corporativos, trilha de auditoria e BI |
| Usuários | Autenticação acadêmica local | Autenticação segura, perfis, permissões e backend |
| Inteligência artificial | Previsão demonstrativa, não operacional | Detecção experimental validada por especialista antes de uso |

A comercialização depende da construção e validação dos itens da coluna futura. **O APK da entrega acadêmica não deve ser tratado como software corporativo pronto para contratação.**

## 5. Clientes, público-alvo e personas

### Mercado-alvo

O público-alvo primário são **concessionárias de rodovias** e suas áreas de manutenção, conservação, operação, engenharia e inovação. Em uma segunda fase, a solução poderia ser adaptada a operadores de ferrovias, faixas de domínio e órgãos públicos responsáveis por infraestrutura linear, com requisitos próprios.

O modelo é **B2B (business-to-business)**. O usuário que registra uma ocorrência não é necessariamente a pessoa que aprova o orçamento de contratação.

### Personas

**Mariana — Gerente de Manutenção (compradora/influenciadora).** Precisa priorizar recursos, justificar intervenções e acompanhar indicadores. Valoriza redução de incerteza, rastreabilidade e integração a processos existentes.

**Rafael — Analista de Operações (usuário diário).** Consulta diferentes ocorrências e evidências, organiza criticidades e acompanha pendências. Valoriza filtros, clareza visual e rapidez para elaborar relatórios.

**Juliana — Supervisora de Campo (usuária operacional).** Coordena atividades de manutenção e confirma andamento ou conclusão dos serviços. Valoriza contexto de localização, evidências objetivas e atualização simples de status.

## 6. Modelo de receita e comercialização

A hipótese comercial principal é **SaaS B2B por trecho monitorado**, com contratação anual e pagamento mensal, combinado a serviços opcionais:

1. **Implantação inicial (pagamento único):** parametrização de trechos, treinamento de usuários, estruturação de dados e integrações acordadas.
2. **Licença recorrente:** acesso à plataforma, hospedagem, manutenção, suporte e volume de processamento contratualmente definido.
3. **Serviços adicionais:** integração com sistemas legados, relatórios específicos, maior volume de imagens e suporte ampliado.
4. **Aquisição/operação de drones:** realizada pelo cliente ou fornecedor habilitado e **orçada separadamente**, nunca presumida como parte da licença padrão.

### Hipótese de precificação — exemplo acadêmico

| Item | Valor ilustrativo | Condição |
|---|---:|---|
| Implantação por concessionária | **R$ 20.000** (único) | Integração básica e treinamento |
| Licença da plataforma | **R$ 14.000/mês** | Um contrato de referência cobrindo até 200 km de trecho |
| Ampliação de cobertura | Sob proposta | Depende de imagens, armazenamento e SLA |
| Operação de drones e aquisição especial de imagens | Sob orçamento | Não incluída no preço-base |

**Atenção:** valores hipotéticos construídos para análise acadêmica; não são cotações de fornecedores, preços praticados pela Motiva nem contratos existentes. A unidade de faturamento, quantidade de usuários e faixas de quilometragem precisariam ser validadas em negociações reais.

### Canais de aquisição e relacionamento

A entrada comercial ocorreria por pilotos com áreas de manutenção e inovação, demonstrações orientadas a casos de uso e processos formais de compras corporativas. O relacionamento incluiria treinamento inicial, suporte acordado em contrato, reuniões de acompanhamento e indicadores de valor. Contratos devem prever segurança, responsabilidades e condições de uso das imagens.

## 7. Estrutura de custos e viabilidade financeira

### Premissas mensais de operação — cenário de referência

Os custos abaixo simulam **um produto comercial após a implementação das integrações necessárias**, e não a operação do APK acadêmico.

| Custo variável por contrato/200 km | Estimativa mensal |
|---|---:|
| Nuvem, banco de dados e armazenamento | R$ 1.000 |
| Processamento e análise de imagens | R$ 2.200 |
| Licenciamento/obtenção de imagens regulares | R$ 2.500 |
| Suporte operacional proporcional ao cliente | R$ 1.800 |
| Backup, monitoramento e tráfego adicional | R$ 700 |
| **Total variável por cliente** | **R$ 8.200** |

Custos fixos mensais estimados de operação enxuta: **R$ 25.000**, incluindo manutenção evolutiva da plataforma, gestão administrativa/comercial e atividades básicas de segurança e qualidade. O cenário supõe uso compartilhado de equipe e recursos; não corresponde a um orçamento validado com fornecedores.

Com receita de R$ 14.000 e custo variável de R$ 8.200, a **margem de contribuição estimada** é de **R$ 5.800 por contrato/mês (41,4%)**, antes de custos fixos, tributos, despesas financeiras, investimentos e custos de aquisição de clientes.

O ponto de equilíbrio operacional simplificado, desconsiderando implantação, tributos e sazonalidade, seria **5 contratos ativos**: `R$ 25.000 ÷ R$ 5.800 = 4,31`, arredondados para cima.

| Contratos ativos | Receita mensal | Custos variáveis | Custos fixos | Resultado operacional simplificado |
|---:|---:|---:|---:|---:|
| 1 | R$ 14.000 | R$ 8.200 | R$ 25.000 | **–R$ 19.200** |
| 5 | R$ 70.000 | R$ 41.000 | R$ 25.000 | **R$ 4.000** |
| 10 | R$ 140.000 | R$ 82.000 | R$ 25.000 | **R$ 33.000** |

A implantação única de R$ 20.000 não foi somada às receitas recorrentes da tabela. Ela tem custos específicos e não deve ser confundida com lucro integral. **Este quadro é uma simulação de unit economics, não projeção financeira auditada.**

### Investimento e validação antes da escala

Seriam necessários recursos adicionais para desenvolver backend corporativo, autenticação adequada, georreferenciamento real, integrações, coleta/licenciamento de imagens, validação de modelos, testes de segurança e implantação piloto. O orçamento desse investimento inicial **não foi apurado** e deve ser estimado separadamente antes de uma decisão de investimento. Também não se presume economia financeira obtida pelo protótipo.

## 8. Concorrência, alternativas e diferenciais

As alternativas para o cliente incluem vistorias presenciais com registros manuais, planilhas, ferramentas GIS, plataformas de gestão de ativos, sistemas de ordens de serviço e serviços especializados de inspeção por drones.

O Motiva Challenge buscaria se diferenciar por uma interface móvel direcionada à vegetação rodoviária, associação entre imagens e criticidade, visualização de status de atendimento e relatórios consolidados. **O produto futuro deve se integrar às ferramentas já utilizadas pela concessionária quando for mais econômico do que substituí-las.**

A hipótese de vantagem competitiva será testada por: tempo de registro por ocorrência, utilidade dos filtros, facilidade de adoção, qualidade das evidências, esforço de integração e custo total de uso.

## 9. Riscos e mitigações

| Risco | Consequência | Mitigação proposta |
|---|---|---|
| Falsos positivos/negativos na detecção | Prioridade incorreta e risco operacional | Validação humana, amostras rotuladas, auditoria de precisão e recálculo periódico |
| Dados desatualizados ou geolocalização imprecisa | Atendimento em local errado | Carimbo temporal, coordenadas verificadas e confirmação em campo |
| Integração complexa com sistemas existentes | Atraso e custo adicional | Piloto de escopo reduzido, APIs documentadas e implantação gradual |
| Segurança e privacidade das imagens | Exposição de informações e riscos legais | Controle de acesso, retenção definida, criptografia, gestão de fornecedores e avaliação LGPD quando aplicável |
| Disponibilidade e qualidade das imagens | Cobertura irregular do monitoramento | Fontes alternativas autorizadas e procedimento de inspeção convencional |
| Regras de uso de drones | Impossibilidade de executar determinadas capturas | Operadores habilitados, verificação de cadastro e autorização aplicável junto a ANAC/DECEA [2][3] |
| Não comprovação de retorno econômico | Baixa adesão comercial | Comparação com linha de base e KPIs de piloto antes de contratar em escala |
| Dependência de um comprador | Receita concentrada | Expansão progressiva a outras concessionárias somente após validação |

**Limitação atual de segurança:** o APK acadêmico usa credenciais fictícias armazenadas localmente. Antes de qualquer uso corporativo seriam obrigatórios autenticação segura, backend, gestão de usuários, controles de acesso e revisão de segurança.

## 10. Impacto esperado para a Motiva

**Segurança viária:** apoiar a identificação precoce de pontos nos quais a vegetação possa afetar visibilidade e sinalização; a efetiva redução de acidentes **não foi demonstrada** e dependeria de estudos próprios.

**Eficiência operacional:** melhorar a organização de inspeções e ordens de atendimento, priorizando trechos e documentando conclusões.

**Governança:** oferecer evidência e histórico do tratamento de cada ocorrência para planejamento e auditoria.

**Sustentabilidade e uso de recursos:** potencialmente apoiar intervenções mais direcionadas e reduzir deslocamentos redundantes; benefícios ambientais devem ser calculados com dados reais.

Esses são **impactos pretendidos**, não resultados medidos na Sprint 4. Não há números reais de economia, redução de acidentes ou produtividade comprovados pelo protótipo.

## 11. Indicadores de sucesso (KPIs)

| Indicador | Forma de medição no piloto | Critério de avaliação |
|---|---|---|
| Tempo de identificação | Horas entre registro da evidência e abertura da ocorrência | Comparar mediana com a linha de base |
| Tempo até triagem | Horas entre abertura e classificação validada | Redução relativa observada |
| Tempo até encaminhamento | Horas entre confirmação e designação de equipe | Medir distribuição e atrasos |
| Precisão da classificação | Amostra auditada por especialista | Precisão, recall e erros por categoria |
| Taxa de ocorrências resolvidas | Resolvidas / total registrado no período | Acompanhar evolução sem confundir com criticidade |
| Produtividade | Ocorrências verificadas por hora/equipe | Comparação antes e depois |
| Custo por quilômetro inspecionado | Custos diretos do processo / extensão inspecionada | Comparar com método atual |
| Adoção | Usuários ativos e registros completos | Verificar utilidade efetiva da solução |

**Metas preliminares de pesquisa, não promessas contratuais:** investigar a possibilidade de reduzir em **20%** o tempo médio de triagem e em **15%** o retrabalho administrativo durante um piloto. Tais percentuais são **hipóteses de validação**, não resultados atuais; só podem ser confirmados com linha de base e amostras comparáveis.

## 12. Proposta de piloto de 90 dias

**Escopo sugerido:** um corredor rodoviário delimitado, por exemplo **50 a 100 km**, escolhido em conjunto com a área operacional. A extensão é uma sugestão de desenho experimental, não trecho já contratado.

| Período | Atividade e entregável |
|---|---|
| Semanas 1–2 | Mapear processo atual, dados disponíveis, riscos, responsáveis e linha de base |
| Semanas 3–4 | Implantar fluxo piloto, cadastrar trecho, treinar usuários e padronizar evidências |
| Semanas 5–8 | Usar ocorrências reais supervisionadas; testar priorização e fluxo de atendimento |
| Semanas 9–10 | Auditar erros, precisão, disponibilidade, segurança e aderência ao processo |
| Semanas 11–12 | Consolidar KPIs, custos, feedback e decisão de continuar, ajustar ou encerrar |

Durante o piloto, alertas e classificações automatizadas seriam **recomendações submetidas à validação humana**. Vistorias e serviços essenciais não dependeriam exclusivamente da plataforma.

**Portões de decisão:** aderência operacional, qualidade mínima de dados, viabilidade regulatória, custos reais de imagens/processamento, segurança da informação e melhoria mensurável dos KPIs. Na ausência de evidência suficiente, a proposta é revisar o escopo, não declarar sucesso.

## 13. Roadmap de evolução

**Fase 0 — Sprint 4 (realizada no projeto acadêmico):** protótipo móvel, dados simulados, fluxos de alerta/status, relatórios e APK Android. Evidencia experiência e arquitetura inicial, não detecção real.

**Fase 1 — MVP integrado:** autenticação corporativa, banco de dados seguro, mapas reais, API de ocorrências e auditoria de ações.

**Fase 2 — Monitoramento assistido:** pipeline de imagens autorizadas, anotação humana, regras de criticidade e avaliação rigorosa de visão computacional.

**Fase 3 — Piloto operacional:** implantação controlada, acompanhamento de KPIs, ajustes e validação do custo-benefício.

**Fase 4 — Escala condicionada:** expansão a outros trechos e concessionárias apenas se o piloto comprovar utilidade, segurança e viabilidade financeira.

## 14. Conclusão

O Motiva Challenge apresenta uma proposta de negócio baseada na **transformação de observações de vegetação em ocorrências operacionais priorizadas e rastreáveis**. Seu potencial valor está no suporte à manutenção preventiva, melhor comunicação entre áreas e decisões com evidências.

A Sprint 4 entrega a **demonstração funcional da experiência móvel**, enquanto a oferta comercial requer integrações reais, validação de dados e modelos, controles de segurança, fornecedores e um piloto formal. O caminho recomendado é adotar uma licença B2B recorrente **somente após comprovar benefícios técnicos e econômicos** por meio do piloto proposto.

---

## 15. Fontes e premissas

**Fontes públicas consultadas**

[1] **Motiva — Sobre a Motiva.** Contexto institucional e extensão aproximada de rodovias administradas. https://www.motiva.com.br/motiva/sobre-a-motiva/ (consulta em outubro de 2026).

[2] **DECEA — DRONE (UAS).** Orientações e regulamentação de acesso ao espaço aéreo, incluindo SARPAS. https://www.decea.mil.br/drone/ (consulta em outubro de 2026).

[3] **Governo Federal — Solicitar autorização para voo de aeronaves remotamente pilotadas.** Fluxo de autorização via SARPAS e referências ao SISANT/ANAC. https://www.gov.br/pt-br/servicos/solicitar-autorizacao-para-voo-de-aeronaves-remotamente-pilotadas (consulta em outubro de 2026).

**Fontes internas:** escopo e funcionalidades informados no projeto acadêmico Motiva Challenge, documentação e relatório de implementação da Sprint 4.

**Premissas elaboradas pela equipe para fins acadêmicos:** preço de R$ 14 mil/mês, implantação de R$ 20 mil, limite referencial de 200 km, custos fixos/variáveis e metas exploratórias do piloto. Nenhum desses valores corresponde a cotação, proposta aprovada, dado operacional da Motiva ou benefício comprovado.

**Aviso de uso:** documento acadêmico; não representa posicionamento oficial, parceria comercial formal, contrato ou oferta aprovada pela Motiva.
