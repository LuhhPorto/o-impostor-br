// Tela de resultados - Mostra o vencedor e informações finais
// Design: Tropicalismo Digital - Celebração visual com confetes

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, RotateCcw } from 'lucide-react';
import { Player } from '@/types/game';

interface ResultsScreenProps {
  players: Player[];
  secretWord: string;
  winner: 'impostor' | 'players';
  impostorGuess?: string;
  votingResults?: Map<number, number>;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export default function ResultsScreen({
  players,
  secretWord,
  winner,
  impostorGuess,
  votingResults,
  onPlayAgain,
  onBackToMenu,
}: ResultsScreenProps) {
  const impostor = players.find(p => p.isImpostor);
  const impostorWon = winner === 'impostor';

  // Encontrar mais votado
  let mostVotedId = -1;
  let maxVotes = 0;
  if (votingResults) {
    votingResults.forEach((votes, playerId) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        mostVotedId = playerId;
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 watercolor-texture">
      <div className="w-full max-w-3xl spring-in">
        {/* Emoji de resultado */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 float">
            {impostorWon ? '🎭' : '🎉'}
          </div>
          <h2 className={`text-display text-5xl md:text-6xl mb-2 ${
            impostorWon ? 'text-accent' : 'text-primary'
          }`}>
            {impostorWon ? 'Impostor Venceu!' : 'Jogadores Venceram!'}
          </h2>
        </div>

        {/* Card de informações */}
        <Card className="p-8 md:p-12 bg-card/95 backdrop-blur-sm shadow-2xl border-4 border-primary/20 mb-6">
          <div className="space-y-8">
            {/* Palavra secreta */}
            <div className="text-center">
              <p className="text-body text-lg text-foreground/70 font-medium mb-2">
                A palavra era:
              </p>
              <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-3xl px-8 py-6 inline-block shadow-xl">
                <span className="text-display text-4xl md:text-5xl">{secretWord}</span>
              </div>
            </div>

            {/* Impostor revelado */}
            <div className="text-center">
              <p className="text-body text-lg text-foreground/70 font-medium mb-2">
                O impostor era:
              </p>
              <div className="bg-gradient-to-br from-accent to-destructive text-accent-foreground rounded-3xl px-8 py-6 inline-block shadow-xl">
                <span className="text-display text-3xl md:text-4xl">
                  {impostor?.name || 'Desconhecido'}
                </span>
              </div>
            </div>

            {/* Detalhes do resultado */}
            <div className="bg-secondary/20 rounded-2xl p-6 border-2 border-secondary/40">
              <h3 className="text-display text-2xl text-foreground mb-4 text-center">
                O que aconteceu?
              </h3>
              <div className="text-body text-base text-foreground/80 space-y-2 font-medium">
                {impostorGuess ? (
                  <>
                    <p>• O impostor tentou adivinhar a palavra</p>
                    <p>• Palpite do impostor: <strong className="text-accent">"{impostorGuess}"</strong></p>
                    <p>• {impostorGuess.toLowerCase() === secretWord.toLowerCase() 
                      ? '✓ Acertou! O impostor venceu!' 
                      : '✗ Errou! Os jogadores venceram!'}</p>
                  </>
                ) : votingResults && (
                  <>
                    <p>• Os jogadores votaram em quem achavam ser o impostor</p>
                    <p>• Mais votado: <strong className="text-primary">
                      {players.find(p => p.id === mostVotedId)?.name || 'Ninguém'}
                    </strong> ({maxVotes} votos)</p>
                    <p>• {mostVotedId === impostor?.id 
                      ? '✓ Descobriram o impostor! Jogadores venceram!' 
                      : '✗ Votaram na pessoa errada! Impostor venceu!'}</p>
                  </>
                )}
              </div>
            </div>

            {/* Placar de votos (se houver) */}
            {votingResults && votingResults.size > 0 && (
              <div>
                <h3 className="text-display text-xl text-foreground mb-3 text-center">
                  Placar de Votos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from(votingResults.entries())
                    .sort((a, b) => b[1] - a[1])
                    .map(([playerId, votes]) => {
                      const player = players.find(p => p.id === playerId);
                      return (
                        <div 
                          key={playerId}
                          className={`rounded-xl p-4 text-center border-2 ${
                            player?.isImpostor 
                              ? 'bg-accent/20 border-accent' 
                              : 'bg-muted/20 border-muted'
                          }`}
                        >
                          <p className="text-body font-semibold text-foreground">
                            {player?.name}
                          </p>
                          <p className="text-display text-2xl text-foreground">
                            {votes} {votes === 1 ? 'voto' : 'votos'}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Botões de ação */}
        <div className="space-y-4">
          <Button
            size="lg"
            onClick={onPlayAgain}
            className="w-full h-16 text-display text-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-primary/30"
          >
            <RotateCcw className="mr-3 h-6 w-6" />
            Jogar Novamente
          </Button>

          <Button
            size="lg"
            onClick={onBackToMenu}
            variant="outline"
            className="w-full h-14 text-display text-lg border-4 border-muted hover:bg-muted hover:text-muted-foreground transition-all duration-300"
          >
            <Home className="mr-2 h-5 w-5" />
            Voltar ao Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
