import type { PanelAnalysis, StageTheme } from "../types/panel";
import { Button } from "./Button";
import { Card } from "./Card";
import { StageMedallion } from "./StageMedallion";

type StageScreenProps = {
  theme: StageTheme;
  analysis: PanelAnalysis;
  onBack: () => void;
  onContinue: () => void;
};

const themeMeta = {
  turtle: {
    emoji: "🐢",
    label: "Turtle",
    title: "Feel Clearly",
    subtitle: "Slow the emotion before interpretation starts hardening into certainty.",
  },
  owl: {
    emoji: "🦉",
    label: "Owl",
    title: "See Clearly",
    subtitle: "Separate what happened from what your mind is adding to it.",
  },
  fox: {
    emoji: "🦊",
    label: "Fox",
    title: "Act Strategically",
    subtitle: "Choose the move that serves your goal, not just your impulse.",
  },
} as const;

export function StageScreen({ theme, analysis, onBack, onContinue }: StageScreenProps) {
  const meta = themeMeta[theme];

  return (
    <section className={`stage stage--${theme}`}>
      <Card className={`stage-hero stage-hero--${theme}`}>
        <div className="stage-hero__icon" aria-hidden="true">
          <StageMedallion
            theme={theme}
            emoji={meta.emoji}
            label={meta.label}
            size="large"
          />
        </div>
        <div>
          <span className="eyebrow">{meta.label}</span>
          <h2>{meta.title}</h2>
          <p>{meta.subtitle}</p>
        </div>
      </Card>

      {theme === "turtle" ? (
        <div className="stage-grid">
          <Card>
            <h3>Emotional acknowledgment</h3>
            <p>{analysis.turtle.acknowledgment}</p>
          </Card>
          <Card>
            <h3>Grounding guidance</h3>
            <ul className="stack-list">
              {analysis.turtle.grounding.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3>Reflective prompt</h3>
            <p>{analysis.turtle.reflectivePrompt}</p>
            {analysis.turtle.caution ? (
              <div className="focus-note">{analysis.turtle.caution}</div>
            ) : null}
          </Card>
          <Card>
            <h3>What may need care</h3>
            <p>{analysis.emotionalNeed}</p>
            {analysis.clarifyingQuestions.length > 0 ? (
              <>
                <h4>Helpful clarifying questions</h4>
                <ul className="stack-list">
                  {analysis.clarifyingQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </Card>
        </div>
      ) : null}

      {theme === "owl" ? (
        <div className="stage-grid">
          <Card>
            <h3>What is known</h3>
            <ul className="stack-list">
              {analysis.owl.known.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3>What is assumed</h3>
            <ul className="stack-list">
              {analysis.owl.assumed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3>Alternative interpretations</h3>
            <ul className="stack-list">
              {analysis.owl.alternatives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3>Reframing questions</h3>
            <ul className="stack-list">
              {analysis.owl.reframes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}

      {theme === "fox" ? (
        <div className="stack">
          <Card className="fox-spotlight">
            <div className="fox-spotlight__header">
              <span className="recommend-badge">Best next move</span>
              <span className="pill">Long-term strength</span>
            </div>
            <h3>
              {
                analysis.fox.options.find(
                  (option) => option.id === analysis.fox.recommendedId,
                )?.title
              }
            </h3>
            <p>{analysis.fox.reasoning}</p>
          </Card>
          <div className="option-grid">
            {analysis.fox.options.map((option) => {
              const recommended = option.id === analysis.fox.recommendedId;

              return (
                <Card className={`option-card ${recommended ? "option-card--recommended" : ""}`} key={option.id}>
                  <div className="option-card__top">
                    <span className="pill">{option.timing}</span>
                    {recommended ? <span className="recommend-badge">Recommended</span> : null}
                  </div>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                  <div className="option-card__detail">
                    <strong>Likely outcome</strong>
                    <p>{option.likelyOutcome}</p>
                  </div>
                  <div className="option-card__detail">
                    <strong>Strategic value</strong>
                    <p>{option.strength}</p>
                  </div>
                </Card>
              );
            })}
          </div>
          <Card className="reason-card">
            <h3>Why this is the strongest move</h3>
            <p>{analysis.fox.reasoning}</p>
          </Card>
        </div>
      ) : null}

      <div className="form-actions">
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
        <Button onClick={onContinue}>
          {theme === "fox" ? "See Summary" : theme === "turtle" ? "Continue to Owl" : "Continue to Fox"}
        </Button>
      </div>
    </section>
  );
}
