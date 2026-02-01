// Tela inicial - Configuração do jogo
// Design: Tropicalismo Digital - Cores vibrantes, formas orgânicas, tipografia expressiva

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus } from 'lucide-react';

interface SetupScreenProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
  onStart: () => void;
}

export default function SetupScreen({ playerCount, onPlayerCountChange, onStart }: SetupScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 watercolor-texture">
      <div className="w-full max-w-md spring-in">
        {/* Logo/Título */}
        <div className="text-center mb-12">
          <h1 className="text-display text-6xl md:text-7xl text-primary mb-4 float">
            O Impostor BR
          </h1>
          <p className="text-body text-lg md:text-xl text-foreground/80 font-semibold">
            Jogo de dedução social
          </p>
        </div>

        {/* Card de configuração */}
        <Card className="p-8 bg-card/95 backdrop-blur-sm shadow-2xl border-4 border-primary/20">
          <div className="space-y-8">
            {/* Seletor de jogadores */}
            <div>
              <label className="text-display text-2xl text-foreground block mb-4 text-center">
                Número de Jogadores
              </label>
              
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onPlayerCountChange(playerCount - 1)}
                  disabled={playerCount <= 3}
                  className="h-16 w-16 rounded-full border-4 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 disabled:opacity-30"
                >
                  <Minus className="h-8 w-8" />
                </Button>

                <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-3xl px-10 py-6 min-w-[120px] text-center shadow-lg">
                  <span className="text-display text-5xl">{playerCount}</span>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onPlayerCountChange(playerCount + 1)}
                  disabled={playerCount >= 10}
                  className="h-16 w-16 rounded-full border-4 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 disabled:opacity-30"
                >
                  <Plus className="h-8 w-8" />
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
                Mínimo 3 • Máximo 10
              </p>
            </div>

            {/* Botão iniciar */}
            <Button
              size="lg"
              onClick={onStart}
              className="w-full h-16 text-display text-2xl bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-accent/30"
            >
              Próximo
            </Button>
          </div>
        </Card>

        {/* Instruções */}
        <div className="mt-8 text-center">
          <p className="text-body text-sm text-foreground/60 font-medium">
            Todos os jogadores compartilham o mesmo dispositivo
          </p>
        </div>
      </div>
    </div>
  );
}
