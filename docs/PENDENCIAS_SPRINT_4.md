# Pendências propostas — Sprint 4

Esta lista separa evoluções futuras do escopo entregue na Sprint 3. Nenhum item abaixo deve ser interpretado como concluído.

## Prioridades funcionais

1. **PDF real de conformidade:** avaliar `expo-print` e `expo-sharing`, com geração, compartilhamento, cancelamento e fallback. A Sprint 3 manteve apenas uma prévia funcional para preservar estabilidade.
2. **Testes automatizados essenciais:** introduzir testes unitários dos seletores, transições do reducer e validação dos patches; adicionar poucos testes de integração dos fluxos críticos.
3. **Estratégia explícita para migração de persistência:** caso o formato evolua além da versão 1, migrar ou descartar patches antigos de maneira controlada.
4. **Acessibilidade e dispositivos adicionais:** validar leitor de tela, escala de fonte, contraste e tamanhos menores/maiores além do Pixel 5.

## Refinamento planejado

- Refinar tipografia, hierarquia, espaçamentos, cards, cabeçalhos e navegação inferior sem mover regras de negócio de volta para as telas.
- Atualizar as capturas do README depois do refinement visual, pois as imagens atuais representam a versão anterior do protótipo.
- Revisar textos operacionais e datas com usuários da persona acadêmica.

## Evoluções fora do protótipo atual

- O mapa continua propositalmente simulado. Um mapa real exigiria escolha de provedor, custos, chaves e política de privacidade.
- Satélites, drones, visão computacional e previsão por IA continuam conceituais/mocados.
- Não há backend, banco ou autenticação de produção. Se o projeto deixar de ser acadêmico, senha e sessão devem sair do armazenamento local simples e usar uma arquitetura segura no servidor.
- Não há sincronização multiusuário nem auditoria histórica de ações.

## Riscos conhecidos

- AsyncStorage é adequado à demonstração offline, mas não é um cofre para credenciais.
- Uma falha real de escrita mantém a ocorrência anterior e informa erro, porém não há fila de repetição automática.
- A alternância `CENARIO_MOCK_ATIVO` é intencionalmente manual e voltada a QA; não existe seletor de cenários na interface final.

