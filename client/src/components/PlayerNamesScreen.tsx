// Tela de configuração de nomes dos jogadores
// Design: Tropicalismo Digital - Inputs com validação

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Play } from 'lucide-react';
import { Player } from '@/types/game';

interface PlayerNamesScreenProps {
  players: Player[];
  onUpdateName: (playerId: number, name: string) => void;
  onStart: () => void;
  onBack: () => void;
}

export default function PlayerNamesScreen({
  players,
  onUpdateName,
  onStart,
  onBack,
}: PlayerNamesScreenProps) {
  const [localNames, setLocalNames] = useState<string[]>(players.map(p => p.name));
  const [allFilled, setAllFilled] = useState(false);

  // Verificar se todos os nomes foram preenchidos
  useEffect(() => {
    const filled = localNames.every(name => name.trim().length > 0);
    setAllFilled(filled);
  }, [localNames]);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...localNames];
    newNames[index] = value;
    setLocalNames(newNames);
  };

  const handleStart = () => {
    // Atualizar nomes no estado do jogo
    localNames.forEach((name, index) => {
      onUpdateName(index, name);
    });
    onStart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 watercolor-texture">
      <div className="w-full max-w-2xl spring-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-display text-4xl md:text-5xl text-primary mb-2">
            Nomes dos Jogadores
          </h2>
          <p className="text-body text-lg text-foreground/70 font-medium">
            Insira o nome de cada jogador
          </p>
        </div>

        {/* Card principal */}
        <Card className="p-8 md:p-12 bg-card/95 backdrop-blur-sm shadow-2xl border-4 border-primary/20 mb-6">
          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={player.id} className="space-y-2">
                <label className="text-body text-sm font-semibold text-foreground/70">
                  Jogador {index + 1}
                </label>
                <Input
                  type="text"
                  value={localNames[index]}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Digite o nome do jogador ${index + 1}`}
                  maxLength={30}
                  className="h-14 text-lg font-medium border-4 border-primary/40 focus:border-primary rounded-xl"
                  autoFocus={index === 0}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Botões de ação */}
        <div className="space-y-4">
          <Button
            size="lg"
            onClick={handleStart}
            disabled={!allFilled}
            className="w-full h-16 text-display text-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-primary/30 disabled:opacity-50"
          >
            <Play className="mr-3 h-6 w-6" />
            Iniciar Jogo
          </Button>

          <Button
            size="lg"
            onClick={onBack}
            variant="outline"
            className="w-full h-14 text-display text-lg border-4 border-muted hover:bg-muted hover:text-muted-foreground transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar
          </Button>
        </div>

        {/* Dica */}
        <div className="mt-6 text-center">
          <p className="text-body text-sm text-foreground/60 font-medium">
            {allFilled ? '✓ Todos os nomes preenchidos!' : 'Preencha todos os nomes para continuar'}
          </p>
        </div>
      </div>
    </div>
  );
}
