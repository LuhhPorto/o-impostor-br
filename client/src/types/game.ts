// Tipos para o jogo O Impostor BR
// Design: Tropicalismo Digital

export type GamePhase = 
  | 'setup'           // Configuração inicial
  | 'player-names'    // Configuração de nomes dos jogadores
  | 'ready-check'     // Verificação de prontidão antes de revelar
  | 'word-reveal'     // Revelação da palavra para cada jogador
  | 'discussion'      // Rodadas de discussão
  | 'impostor-guess'  // Impostor tenta adivinhar
  | 'voting'          // Votação final
  | 'results';        // Resultados

export interface Player {
  id: number;
  name: string;
  isImpostor: boolean;
  hasSeenWord: boolean;
  votedFor?: number;
  confirmed?: boolean; // Confirmou que está pronto para ver a informação
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  totalPlayers: number;
  secretWord: string;
  impostorId: number;
  currentPlayerIndex: number;
  currentRound: number;
  totalRounds: number;
  usedWords: string[];
  impostorGuess?: string;
  votingResults?: Map<number, number>;
  winner?: 'impostor' | 'players';
  lastStartingPlayerIndex?: number; // Índice do último jogador que começou (para rotação)
  playerOrder?: number[]; // Ordem dos jogadores para a rodada
}

export interface WordBank {
  words: string[];
}
