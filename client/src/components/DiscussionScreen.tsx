// Tela de discussão - Rodadas de conversa
// Design: Tropicalismo Digital - Layout orgânico com elementos flutuantes

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Search, Vote } from 'lucide-react';

interface DiscussionScreenProps {
  currentRound: number;
  totalRounds: number;
  playerCount: number;
  onNextRound: () => void;
  onImpostorGuess: () => void;
  onVote: () => void;
  players?: any[];
}

export default function DiscussionScreen({
  currentRound,
  totalRounds,
  playerCount,
  onNextRound,
  onImpostorGuess,
  onVote,
}: DiscussionScreenProps) {
  const isLastRound = currentRound >= totalRounds;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 watercolor-texture">
      <div className="w-full max-w-3xl spring-in">
        {/* Header com rodada */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full px-8 py-3 shadow-lg mb-4">
            <span className="text-display text-2xl">
              Rodada {currentRound} de {totalRounds}
            </span>
          </div>
          <h2 className="text-display text-4xl md:text-5xl text-primary mb-2 float">
            Discussão
          </h2>
          <p className="text-body text-lg text-foreground/70 font-medium">
            {playerCount} jogadores participando
          </p>
        </div>

        {/* Card principal */}
        <Card className="p-8 md:p-12 bg-card/95 backdrop-blur-sm shadow-2xl border-4 border-primary/20 mb-6">
          <div className="space-y-8">
            {/* Instruções */}
            <div className="bg-secondary/20 rounded-2xl p-6 border-2 border-secondary/40">
              <div className="flex items-start gap-4">
                <MessageCircle className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-display text-2xl text-foreground mb-2">
                    Como jogar
                  </h3>
                  <ul className="text-body text-base text-foreground/80 space-y-2 font-medium">
                    <li>• Cada jogador fala algo relacionado à palavra</li>
                    <li>• O impostor deve tentar não ser descoberto</li>
                    <li>• Observem quem está sendo vago ou suspeito</li>
                    <li>• O impostor pode tentar adivinhar a palavra a qualquer momento</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timer visual (decorativo) */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center">
                  <span className="text-display text-4xl text-primary">💬</span>
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-display text-xl text-accent-foreground shadow-lg">
                  {currentRound}
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="space-y-4">
              {/* Botão impostor adivinhar */}
              <Button
                size="lg"
                onClick={onImpostorGuess}
                className="w-full h-16 text-display text-xl bg-gradient-to-r from-accent to-destructive hover:from-accent/90 hover:to-destructive/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-accent/30"
              >
                <Search className="mr-3 h-6 w-6" />
                Impostor Quer Adivinhar
              </Button>

              {/* Botão próxima rodada ou votar */}
              {!isLastRound ? (
                <Button
                  size="lg"
                  onClick={onNextRound}
                  variant="outline"
                  className="w-full h-16 text-display text-xl border-4 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                >
                  Próxima Rodada
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={onVote}
                  className="w-full h-16 text-display text-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-primary/30"
                >
                  <Vote className="mr-3 h-6 w-6" />
                  Ir para Votação
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Dica */}
        <div className="text-center">
          <p className="text-body text-sm text-foreground/60 font-medium">
            Discutam livremente entre os jogadores presentes
          </p>
        </div>
      </div>
    </div>
  );
}
