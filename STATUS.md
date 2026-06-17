# STATUS — V6 Agents Platform

## Onde paramos (2026-06-17)
FASE 1 (cérebro inteligente) PROVADA em teste. Três testes rodando no VPS:
- backend/test-helena-brain.js ......... Claude responde (isolado)
- backend/test-helena-real.js .......... fluxo real: contexto + classificação + Claude
- backend/test-helena-continuidade.js .. memória: lembra da conversa anterior

Peça nova: backend/agents/helena-brain.js (ponte com o Claude).
Ainda é TESTE: não está ligado ao WhatsApp nem à produção. Helena de produção intocada.

## Git
- branch `main`: correção de segurança (backend lê credenciais do .env).
- branch `fase1-cerebro`: o cérebro + testes (trabalho de hoje).
- PENDENTE: reconciliar as duas branches (cuidado com package.json).
- Sync da pasta com o notebook falhou: trabalhar pelo VPS por enquanto.

## Próximos passos
1. Fixar: orquestrador chamar o helena-brain de verdade (responder com IA, não template; salvar a resposta real no histórico).
2. Melhorar classificador de intenção (deixar o Claude classificar).
3. FASE 2: Chatwoot como caixa de entrada + conectar WhatsApp (OpenClaw) + aposentar Telegram.
4. SEGURANÇA antes de cliente real: ligar RLS, rotacionar chaves.
