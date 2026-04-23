import { Button } from "./Button";
import { Card } from "./Card";
import { StageMedallion } from "./StageMedallion";

type HomeScreenProps = {
  onStart: () => void;
  onDemo: () => void;
};

const guides = [
  {
    emoji: "🐢",
    name: "Turtle",
    title: "Feel Clearly",
    body: "Slow the surge, name the feeling, and regain steadiness before you respond.",
    theme: "turtle",
  },
  {
    emoji: "🦉",
    name: "Owl",
    title: "See Clearly",
    body: "Separate observation from interpretation and make room for uncertainty.",
    theme: "owl",
  },
  {
    emoji: "🦊",
    name: "Fox",
    title: "Act Strategically",
    body: "Choose the move that protects your goal, your dignity, and the long game.",
    theme: "fox",
  },
] as const;

export function HomeScreen({ onStart, onDemo }: HomeScreenProps) {
  return (
    <section className="hero">
      <div className="hero__copy">
        <span className="eyebrow">Guided reflective system</span>
        <h1>The Middle Panel</h1>
        <p className="hero__tagline">Feel clearly. See clearly. Act strategically.</p>
        <p className="hero__description">
          A calm thinking tool for conflict, misunderstanding, and emotionally
          loaded decisions. It helps you slow the feeling, sharpen the
          interpretation, and choose the response most worth making.
        </p>
        <div className="hero__lead-card">
          <span className="pill">Why it works</span>
          <p>
            Most people react first, interpret second, and regret later. This
            experience reverses that sequence.
          </p>
        </div>
        <div className="hero__actions">
          <Button onClick={onStart} size="large">
            Start Reflection
          </Button>
          <Button onClick={onDemo} variant="secondary">
            Load Example
          </Button>
        </div>
      </div>

      <Card className="hero__panel">
        <div className="hero__panel-header">
          <span className="pill">Three-stage framework</span>
          <p>Emotion first. Clarity second. Strategy third.</p>
        </div>
        <div className="guide-preview">
          {guides.map((guide) => (
            <article className={`guide-preview__card guide-preview__card--${guide.theme}`} key={guide.name}>
              <div className="guide-preview__icon" aria-hidden="true">
                <StageMedallion
                  theme={guide.theme}
                  emoji={guide.emoji}
                  label={guide.name}
                />
              </div>
              <div>
                <h2>{guide.title}</h2>
                <h3>{guide.name}</h3>
                <p>{guide.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </section>
  );
}
