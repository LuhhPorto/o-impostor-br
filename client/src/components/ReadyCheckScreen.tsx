// Tela de verificação de prontidão antes de revelar informação
// Design: Tropicalismo Digital - Segurança e privacidade

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { Player } from '@/types/game';

interface ReadyCheckScreenProps {
  currentPlayer: Player;
  totalPlayers: number;
  currentPlayerIndex: number;
  onReady: () => void;
}

export default function ReadyCheckScreen({
  currentPlayer,
  totalPlayers,
  currentPlayerIndex,
  onReady,
}: ReadyCheckScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 watercolor-texture">
      <div className="w-full max-w-2xl spring-in">
        {/* Indicador de progresso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-body text-sm font-semibold text-foreground/60">
              Jogador {currentPlayerIndex + 1} de {totalPlayers}
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
            {/* Ícone de segurança */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Lock className="h-12 w-12 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-display text-lg text-secondary-foreground shadow-lg">
                  ✓
                </div>
              </div>
            </div>

            {/* Mensagem principal */}
            <div>
              <h2 className="text-display text-3xl md:text-4xl text-primary mb-4">
                Passe o celular para
              </h2>
              <div className="bg-gradient-to-r from-accent to-secondary text-accent-foreground rounded-3xl px-8 py-6 inline-block shadow-lg border-4 border-accent/30">
                <p className="text-display text-4xl md:text-5xl">
                  {currentPlayer.name}
                </p>
              </div>
            </div>

            {/* Instrução */}
            <div className="bg-secondary/20 rounded-2xl p-6 border-2 border-secondary/40">
              <p className="text-body text-base md:text-lg text-foreground font-semibold">
                ⚠️ Certifique-se de que <strong>{currentPlayer.name}</strong> está pronto e que ninguém mais está olhando para a tela.
              </p>
            </div>

            {/* Botão de confirmação */}
            <Button
              size="lg"
              onClick={onReady}
              className="w-full h-16 text-display text-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-primary/30"
            >
              Estou Pronto
            </Button>
          </div>
        </Card>

        {/* Aviso de privacidade */}
        <div className="mt-6 text-center">
          <p className="text-body text-sm text-foreground/60 font-medium">
            Sua informação será protegida e ocultada após você visualizá-la
          </p>
        </div>
      </div>
    </div>
  );
}
