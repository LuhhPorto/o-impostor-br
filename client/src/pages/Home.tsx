// Página principal do jogo O Impostor BR
// Design: Tropicalismo Digital

import { useGameState } from '@/hooks/useGameState';
import SetupScreen from '@/components/SetupScreen';
import PlayerNamesScreen from '@/components/PlayerNamesScreen';
import ReadyCheckScreen from '@/components/ReadyCheckScreen';
import WordRevealScreen from '@/components/WordRevealScreen';
import DiscussionScreen from '@/components/DiscussionScreen';
import ImpostorGuessScreen from '@/components/ImpostorGuessScreen';
import VotingScreen from '@/components/VotingScreen';
import ResultsScreen from '@/components/ResultsScreen';

export default function Home() {
  const {
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
  } = useGameState();

  // Renderizar tela baseada na fase do jogo
  switch (gameState.phase) {
    case 'setup':
      return (
        <SetupScreen
          playerCount={gameState.totalPlayers}
          onPlayerCountChange={(count) => {
            setPlayerCount(count);
          }}
          onStart={() => {
            // Ir para tela de nomes
            setPlayerCount(gameState.totalPlayers);
          }}
        />
      );

    case 'player-names':
      return (
        <PlayerNamesScreen
          players={gameState.players}
          onUpdateName={updatePlayerName}
          onStart={startGame}
          onBack={backToMenu}
        />
      );

    case 'ready-check':
      return (
        <ReadyCheckScreen
          currentPlayer={gameState.players[gameState.currentPlayerIndex]}
          totalPlayers={gameState.totalPlayers}
          currentPlayerIndex={gameState.currentPlayerIndex}
          onReady={confirmReady}
        />
      );

    case 'word-reveal':
      return (
        <WordRevealScreen
          currentPlayer={gameState.players[gameState.currentPlayerIndex]}
          secretWord={gameState.secretWord}
          totalPlayers={gameState.totalPlayers}
          currentPlayerIndex={gameState.currentPlayerIndex}
          onNext={markPlayerSeen}
        />
      );

    case 'discussion':
      return (
        <DiscussionScreen
          currentRound={gameState.currentRound}
          totalRounds={gameState.totalRounds}
          playerCount={gameState.players.length}
          onNextRound={nextRound}
          onImpostorGuess={openImpostorGuess}
          onVote={() => {
            if (gameState.currentRound >= gameState.totalRounds) {
              nextRound();
            }
          }}
        />
      );

    case 'impostor-guess':
      return (
        <ImpostorGuessScreen
          onGuess={impostorGuess}
          onBack={backToDiscussion}
        />
      );

    case 'voting':
      return (
        <VotingScreen
          players={gameState.players}
          onVote={vote}
          onFinish={finishVoting}
        />
      );

    case 'results':
      return (
        <ResultsScreen
          players={gameState.players}
          secretWord={gameState.secretWord}
          winner={gameState.winner || 'players'}
          impostorGuess={gameState.impostorGuess}
          votingResults={gameState.votingResults}
          onPlayAgain={resetGame}
          onBackToMenu={backToMenu}
        />
      );

    default:
      return null;
  }
}
