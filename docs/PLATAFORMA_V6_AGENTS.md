# Plataforma V6 Agents

## Objetivo

Criar uma plataforma própria da V6 Tecnologia para agentes de atendimento, vendas e suporte, evitando configuração manual repetitiva em cada agente.

## Princípio central

O agente não deve depender apenas de prompt solto.

A plataforma deve ter:

- regras fixas
- templates reutilizáveis
- memória estruturada
- repasse confiável
- painel humano
- follow-up automático
- histórico de atendimento

## Arquitetura desejada

WhatsApp
→ Agente IA
→ Backend V6 Agents
→ Banco de dados
→ Painel humano
→ Follow-up automático

## Prioridade atual

1. Estabilizar Helena como agente modelo
2. Criar repasse confiável fora do Telegram
3. Criar registro estruturado de leads
4. Criar base para replicar agentes para outros clientes

## Regra de ouro

Não depender de ajustes constantes em IDENTITY, SOUL e MEMORY para corrigir operação.

O comportamento principal deve estar na plataforma.

## Memória e Ownership da Helena

A Helena não deve funcionar apenas por prompt.

Ela deve consultar a plataforma antes de responder:

1. Buscar contato pelo telefone.
2. Carregar dados do contato.
3. Carregar histórico recente da conversa.
4. Verificar ownership da conversa.
5. Se owner = helena, responder com contexto.
6. Se owner = human, permanecer em silêncio.
7. Registrar histórico e atualizar memória após cada interação.

### Regra crítica

Quando um humano assumir a conversa, a Helena deve ficar silenciosa até que o atendimento seja devolvido para ela.


## Decisão arquitetural — OpenClaw como motor

O OpenClaw deve ser utilizado como motor operacional de execução, sessão e canais.

A inteligência da Helena não deve depender apenas de SOUL, MEMORY ou prompt interno do OpenClaw.

A V6 Agents Platform será responsável por:

- memória por contato
- histórico de conversas
- ownership humano x IA
- tipo de relacionamento
- classificação de intenção
- regras comerciais
- direcionamento para portal de chamados
- atualização de contexto
- consolidação de leads e clientes

A Helena deve consumir essa inteligência antes de responder.

Regra central:

OpenClaw executa.
V6 Agents decide.
Helena comunica.

