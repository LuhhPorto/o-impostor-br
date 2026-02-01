// Hook para gerenciar o estado do jogo O Impostor BR
// Design: Tropicalismo Digital

import { useState, useCallback } from 'react';
import { GameState, Player, GamePhase } from '@/types/game';
import { WORD_BANK } from '@/data/words';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    players: [],
    totalPlayers: 3,
    secretWord: '',
    impostorId: -1,
    currentPlayerIndex: 0,
    currentRound: 1,
    totalRounds: 3,
    usedWords: [],
    lastStartingPlayerIndex: -1,
    playerOrder: [],
  });

  // Configurar número de jogadores
  const setPlayerCount = useCallback((count: number) => {
    const validCount = Math.max(3, Math.min(10, count));
    const players: Player[] = Array.from({ length: validCount }, (_, i) => ({
      id: i,
      name: `Jogador ${i + 1}`,
      isImpostor: false,
      hasSeenWord: false,
      confirmed: false,
    }));

    setGameState(prev => ({
      ...prev,
      totalPlayers: validCount,
      players,
      phase: 'player-names',
    }));
  }, []);

  // Atualizar nome de um jogador
  const updatePlayerName = useCallback((playerId: number, name: string) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      if (newPlayers[playerId]) {
        newPlayers[playerId].name = name.trim() || `Jogador ${playerId + 1}`;
      }
      return {
        ...prev,
        players: newPlayers,
      };
    });
  }, []);

  // Iniciar jogo (após nomes serem configurados)
  const startGame = useCallback(() => {
    setGameState(prev => {
      // Gerar ordem aleatória para primeira partida ou rotativa
      let playerOrder: number[];
      let newLastStartingIndex: number;

      if ((prev.lastStartingPlayerIndex ?? -1) === -1) {
        // Primeira partida - ordem aleatória
        playerOrder = Array.from({ length: prev.totalPlayers }, (_, i) => i);
        playerOrder.sort(() => Math.random() - 0.5);
        newLastStartingIndex = playerOrder[0];
      } else {
        // Partidas subsequentes - rotativa
        const nextStartingIndex = ((prev.lastStartingPlayerIndex ?? 0) + 1) % prev.totalPlayers;
        playerOrder = Array.from({ length: prev.totalPlayers }, (_, i) => 
          (nextStartingIndex + i) % prev.totalPlayers
        );
        newLastStartingIndex = nextStartingIndex;
    }

    // Preservar nomes dos jogadores
      const players: Player[] = prev.players.map(p => ({
        ...p,
        isImpostor: false,
        hasSeenWord: false,
        votedFor: undefined,
        confirmed: false,
      }));

      // Sortear impostor
      const impostorId = playerOrder[Math.floor(Math.random() * playerOrder.length)];
      players[impostorId].isImpostor = true;

      // Sortear palavra (evitar repetição)
      let availableWords = WORD_BANK.filter(w => !prev.usedWords.includes(w));
      if (availableWords.length === 0) {
        availableWords = WORD_BANK; // Reset se todas foram usadas
      }
      const secretWord = availableWords[Math.floor(Math.random() * availableWords.length)];

      return {
        ...prev,
        phase: 'ready-check',
        players,
        impostorId,
        secretWord,
        currentPlayerIndex: 0,
        currentRound: 1,
        usedWords: [...prev.usedWords, secretWord],
        lastStartingPlayerIndex: newLastStartingIndex,
        playerOrder,
      };
    });
  }, []);

  // Confirmar prontidão do jogador
  const confirmReady = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'word-reveal',
    }));
  }, [gameState.currentPlayerIndex, gameState.players]);

  // Marcar que jogador viu a palavra e voltar para ready-check
  const markPlayerSeen = useCallback(() => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[prev.currentPlayerIndex].hasSeenWord = true;
      newPlayers[prev.currentPlayerIndex].confirmed = false; // Reset confirmação

      const nextIndex = prev.currentPlayerIndex + 1;
      
      // Se todos viram, iniciar discussão
      if (nextIndex >= prev.players.length) {
        return {
          ...prev,
          players: newPlayers,
          phase: 'discussion',
          currentRound: 1,
        };
      }

      return {
        ...prev,
        players: newPlayers,
        currentPlayerIndex: nextIndex,
        phase: 'ready-check',
      };
    });
  }, []);

  // Avançar rodada de discussão
  const nextRound = useCallback(() => {
    setGameState(prev => {
      if (prev.currentRound >= prev.totalRounds) {
        return {
          ...prev,
          phase: 'voting',
        };
      }
      return {
        ...prev,
        currentRound: prev.currentRound + 1,
      };
    });
  }, []);

  // Impostor tenta adivinhar
  const impostorGuess = useCallback((guess: string) => {
    const isCorrect = guess.trim().toLowerCase() === gameState.secretWord.toLowerCase();
    
    setGameState(prev => ({
      ...prev,
      impostorGuess: guess,
      phase: 'results',
      winner: isCorrect ? 'impostor' : undefined,
    }));
  }, [gameState.secretWord]);

  // Abrir tela de palpite do impostor
  const openImpostorGuess = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'impostor-guess',
    }));
  }, []);

  // Voltar para discussão
  const backToDiscussion = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'discussion',
    }));
  }, []);

  // Registrar voto
  const vote = useCallback((voterId: number, targetId: number) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[voterId].votedFor = targetId;
      return {
        ...prev,
        players: newPlayers,
      };
    });
  }, []);

  // Finalizar votação
  const finishVoting = useCallback(() => {
    setGameState(prev => {
      // Contar votos
      const voteCounts = new Map<number, number>();
      prev.players.forEach(player => {
        if (player.votedFor !== undefined) {
          voteCounts.set(player.votedFor, (voteCounts.get(player.votedFor) || 0) + 1);
        }
      });

      // Encontrar mais votado
      let maxVotes = 0;
      let mostVoted = -1;
      voteCounts.forEach((votes, playerId) => {
        if (votes > maxVotes) {
          maxVotes = votes;
          mostVoted = playerId;
        }
      });

      // Determinar vencedor
      const winner = mostVoted === prev.impostorId ? 'players' : 'impostor';

      return {
        ...prev,
        phase: 'results',
        votingResults: voteCounts,
        winner,
      };
    });
  }, []);

  // Reiniciar jogo (nova partida)
  const resetGame = useCallback(() => {
    setGameState(prev => ({
      phase: 'player-names',
      players: prev.players.map(p => ({
        ...p,
        isImpostor: false,
        hasSeenWord: false,
        votedFor: undefined,
        confirmed: false,
      })),
      totalPlayers: prev.totalPlayers,
      secretWord: '',
      impostorId: -1,
      currentPlayerIndex: 0,
      currentRound: 1,
      totalRounds: 3,
      usedWords: prev.usedWords,
      lastStartingPlayerIndex: prev.lastStartingPlayerIndex,
      playerOrder: prev.playerOrder,
    }));
  }, []);

  // Voltar ao menu
  const backToMenu = useCallback(() => {
    setGameState({
      phase: 'setup',
      players: [],
      totalPlayers: 3,
      secretWord: '',
      impostorId: -1,
      currentPlayerIndex: 0,
      currentRound: 1,
      totalRounds: 3,
      usedWords: [],
      lastStartingPlayerIndex: -1,
      playerOrder: [],
    });
  }, []);

  return {
    gameState,
    setPlayerCount,
    updatePlayerName,
    startGame,
    confirmReady,
    markPlayerSeen,
    nextRound,
    impostorGuess,
    openImpostorGuess,
    backToDiscussion,
    vote,
    finishVoting,
    resetGame,
    backToMenu,
  };
}
