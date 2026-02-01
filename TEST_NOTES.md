# Notas de Teste - O Impostor BR

## Problema Identificado - CRÍTICO
Ao passar para o segundo jogador, o nome está sendo exibido como "Jogador 2" em vez de "Bruno".

## Análise Detalhada
1. Nomes foram inseridos corretamente na tela PlayerNamesScreen:
   - Jogador 1: Ana ✓ (exibido corretamente)
   - Jogador 2: Bruno ✗ (exibido como "Jogador 2")
   - Jogador 3: Carlos (não testado ainda)

2. Primeira rodada (Ana) funcionou perfeitamente:
   - Nome "Ana" foi exibido corretamente em ReadyCheckScreen
   - Palavra "Moto" foi revelada corretamente
   - Progresso mostrou "Ana" no topo

3. Segunda rodada (Bruno) mostra o problema:
   - ReadyCheckScreen exibe "Jogador 2" em vez de "Bruno"
   - Isso sugere que os nomes não estão sendo preservados corretamente

## Possível Causa
O problema está em como o `currentPlayerIndex` está sendo usado para acessar o array de jogadores.
- Quando `currentPlayerIndex = 1`, deveria acessar `players[1]` que é Bruno
- Mas está acessando um jogador com nome padrão "Jogador 2"

## Solução Necessária
Verificar se a ordem dos jogadores está sendo alterada ou se há um problema na forma como os nomes são acessados após a randomização.
