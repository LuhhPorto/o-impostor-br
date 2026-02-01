// Tela onde o impostor tenta adivinhar a palavra
// Design: Tropicalismo Digital - Input destacado com gradiente

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';

interface ImpostorGuessScreenProps {
  onGuess: (guess: string) => void;
  onBack: () => void;
}

export default function ImpostorGuessScreen({ onGuess, onBack }: ImpostorGuessScreenProps) {
  const [guess, setGuess] = useState('');

  const handleSubmit = () => {
    if (guess.trim()) {
      onGuess(guess.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 watercolor-texture">
      <div className="w-full max-w-2xl spring-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 float">🎭</div>
          <h2 className="text-display text-4xl md:text-5xl text-accent mb-2">
            Palpite do Impostor
          </h2>
          <p className="text-body text-lg text-foreground/70 font-medium">
            Tente adivinhar a palavra secreta
          </p>
        </div>

        {/* Card principal */}
        <Card className="p-8 md:p-12 bg-card/95 backdrop-blur-sm shadow-2xl border-4 border-accent/20">
          <div className="space-y-8">
            {/* Aviso */}
            <div className="bg-destructive/10 rounded-2xl p-6 border-2 border-destructive/40">
              <p className="text-body text-base md:text-lg text-foreground font-semibold text-center">
                ⚠️ Atenção! Se você acertar a palavra, vence automaticamente. Se errar, os jogadores saberão que você é o impostor!
              </p>
            </div>

            {/* Input */}
            <div className="space-y-4">
              <label className="text-display text-2xl text-foreground block text-center">
                Qual é a palavra?
              </label>
              <Input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Digite sua resposta..."
                className="h-16 text-center text-2xl font-semibold border-4 border-accent/40 focus:border-accent rounded-2xl"
                autoFocus
              />
            </div>

            {/* Botões */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!guess.trim()}
                className="w-full h-16 text-display text-xl bg-gradient-to-r from-accent to-destructive hover:from-accent/90 hover:to-destructive/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-accent/30 disabled:opacity-50"
              >
                <Send className="mr-3 h-6 w-6" />
                Confirmar Palpite
              </Button>

              <Button
                size="lg"
                onClick={onBack}
                variant="outline"
                className="w-full h-14 text-display text-lg border-4 border-muted hover:bg-muted hover:text-muted-foreground transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar para Discussão
              </Button>
            </div>
          </div>
        </Card>

        {/* Dica */}
        <div className="mt-6 text-center">
          <p className="text-body text-sm text-foreground/60 font-medium">
            Passe o dispositivo para o impostor
          </p>
        </div>
      </div>
    </div>
  );
}
