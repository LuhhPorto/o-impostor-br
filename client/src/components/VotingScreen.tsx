// Tela de votação - Jogadores votam em quem acham que é o impostor
// Design: Tropicalismo Digital - Cards de jogadores em layout orgânico

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Vote } from 'lucide-react';
import { Player } from '@/types/game';

interface VotingScreenProps {
  players: Player[];
  onVote: (voterId: number, targetId: number) => void;
  onFinish: () => void;
}

export default function VotingScreen({ players, onVote, onFinish }: VotingScreenProps) {
  const [currentVoter, setCurrentVoter] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);

  const handleVote = () => {
    if (selectedTarget !== null) {
      onVote(currentVoter, selectedTarget);
      
      if (currentVoter < players.length - 1) {
        setCurrentVoter(currentVoter + 1);
        setSelectedTarget(null);
      } else {
        onFinish();
      }
    }
  };

  const currentPlayer = players[currentVoter];
  const votableTargets = players.filter(p => p.id !== currentPlayer.id);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 watercolor-texture">
      <div className="w-full max-w-4xl spring-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full px-8 py-3 shadow-lg mb-4">
            <span className="text-display text-xl">
              {currentPlayer.name} está votando
            </span>
          </div>
          <h2 className="text-display text-4xl md:text-5xl text-primary mb-2">
            Votação
          </h2>
          <p className="text-body text-lg text-foreground/70 font-medium">
            Quem você acha que é o impostor?
          </p>
        </div>

        {/* Progresso */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-body text-sm font-semibold text-foreground/60">
              Voto {currentVoter + 1} de {players.length}
            </span>
            <span className="text-body text-sm font-semibold text-foreground/60">
              {Math.round(((currentVoter + 1) / players.length) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
              style={{ width: `${((currentVoter + 1) / players.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Grid de jogadores */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {votableTargets.map((player) => (
            <Card
              key={player.id}
              onClick={() => setSelectedTarget(player.id)}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-4 ${
                selectedTarget === player.id
                  ? 'bg-gradient-to-br from-accent to-secondary border-accent shadow-2xl'
                  : 'bg-card/95 border-border hover:border-primary/40 shadow-lg'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">
                  {selectedTarget === player.id ? '✓' : '👤'}
                </div>
                <p className={`text-display text-xl ${
                  selectedTarget === player.id ? 'text-accent-foreground' : 'text-foreground'
                }`}>
                  {player.name}
                </p>
                {selectedTarget === player.id && (
                  <div className="mt-2 flex justify-center">
                    <Check className="h-6 w-6 text-accent-foreground" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Botão confirmar */}
        <Button
          size="lg"
          onClick={handleVote}
          disabled={selectedTarget === null}
          className="w-full h-16 text-display text-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-primary/30 disabled:opacity-50"
        >
          <Vote className="mr-3 h-6 w-6" />
          Confirmar Voto
        </Button>

        {/* Aviso */}
        <div className="mt-6 text-center">
          <p className="text-body text-sm text-foreground/60 font-medium">
            Passe o dispositivo para cada jogador votar
          </p>
        </div>
      </div>
    </div>
  );
}
