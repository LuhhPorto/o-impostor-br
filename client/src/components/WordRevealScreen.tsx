// Tela de revelação da palavra para cada jogador
// Design: Tropicalismo Digital - Revelação dramática com blur

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { Player } from '@/types/game';

interface WordRevealScreenProps {
  currentPlayer: Player;
  secretWord: string;
  totalPlayers: number;
  currentPlayerIndex: number;
  onNext: () => void;
}

export default function WordRevealScreen({ 
  currentPlayer, 
  secretWord, 
  totalPlayers,
  currentPlayerIndex,
  onNext 
}: WordRevealScreenProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 watercolor-texture">
      <div className="w-full max-w-2xl spring-in">
        {/* Indicador de progresso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-body text-sm font-semibold text-foreground/60">
              {currentPlayer.name}
            </span>
            <span className="text-body text-sm font-semibold text-foreground/60">
              {Math.round(((currentPlayerIndex + 1) / totalPlayers) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
              style={{ width: `${((currentPlayerIndex + 1) / totalPlayers) * 100}%` }}
            />
          </div>
        </div>

        {/* Card principal */}
        <Card className="p-8 md:p-12 bg-card/95 backdrop-blur-sm shadow-2xl border-4 border-primary/20">
          <div className="space-y-8 text-center">
            {/* Nome do jogador */}
            <div>
              <h2 className="text-display text-4xl md:text-5xl text-primary mb-2">
                {currentPlayer.name}
              </h2>
              <p className="text-body text-lg text-foreground/70 font-medium">
                É a sua vez!
              </p>
            </div>

            {/* Instrução */}
            <div className="bg-secondary/20 rounded-2xl p-6 border-2 border-secondary/40">
              <p className="text-body text-base md:text-lg text-foreground font-semibold">
                {!revealed 
                  ? "Clique no botão abaixo para ver sua palavra. Não deixe os outros jogadores verem!"
                  : currentPlayer.isImpostor
                    ? "Você é o impostor! Tente descobrir a palavra ouvindo os outros jogadores."
                    : "Memorize esta palavra. Você precisará falar sobre ela sem revelá-la ao impostor!"
                }
              </p>
            </div>

            {/* Área de revelação */}
            {!revealed ? (
              <Button
                size="lg"
                onClick={() => setRevealed(true)}
                className="w-full h-20 text-display text-2xl md:text-3xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-primary/30"
              >
                <Eye className="mr-3 h-8 w-8" />
                Ver Informação
              </Button>
            ) : (
              <div className="reveal">
                <div className={`rounded-3xl p-12 ${
                  currentPlayer.isImpostor 
                    ? 'bg-gradient-to-br from-destructive to-accent' 
                    : 'bg-gradient-to-br from-primary to-secondary'
                } shadow-2xl border-4 border-white/20`}>
                  <p className="text-display text-5xl md:text-7xl text-white mb-4">
                    {currentPlayer.isImpostor ? '🎭' : secretWord}
                  </p>
                  {currentPlayer.isImpostor && (
                    <p className="text-display text-3xl md:text-4xl text-white">
                      IMPOSTOR
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Botão continuar */}
            {revealed && (
              <Button
                size="lg"
                onClick={onNext}
                variant="outline"
                className="w-full h-16 text-display text-xl border-4 border-muted hover:bg-muted hover:text-muted-foreground transition-all duration-300 hover:scale-105"
              >
                Próximo Jogador
              </Button>
            )}
          </div>
        </Card>

        {/* Aviso de privacidade */}
        {!revealed && (
          <div className="mt-6 flex items-center justify-center gap-2 text-destructive">
            <EyeOff className="h-5 w-5" />
            <p className="text-body text-sm font-bold">
              Certifique-se de que ninguém está olhando!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
