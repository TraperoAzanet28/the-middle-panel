import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { InputScreen } from "./components/InputScreen";
import { ProgressBar } from "./components/ProgressBar";
import { StageScreen } from "./components/StageScreen";
import { SummaryScreen } from "./components/SummaryScreen";
import { demoScenario } from "./data/demoScenario";
import { buildPanelAnalysis } from "./lib/panelEngine";
import type { AppStep, PanelInput } from "./types/panel";

const emptyInput: PanelInput = {
  conflictDescription: "",
  emotion: "confused",
  intensity: 5,
  goal: "get clarity",
  urgency: "soon",
};

function App() {
  const [step, setStep] = useState<AppStep>("home");
  const [input, setInput] = useState<PanelInput>(emptyInput);

  const analysis = buildPanelAnalysis(input);

  const stepTitle = (() => {
    switch (step) {
      case "home":
        return "The Middle Panel";
      case "input":
        return "Describe the Situation";
      case "turtle":
        return "Feel Clearly";
      case "owl":
        return "See Clearly";
      case "fox":
        return "Act Strategically";
      case "summary":
        return "Summary";
    }
  })();

  const handleStart = () => {
    setInput(emptyInput);
    setStep("input");
  };

  const handleDemo = () => {
    setInput(demoScenario);
    setStep("turtle");
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient--turtle" aria-hidden="true" />
      <div className="ambient ambient--owl" aria-hidden="true" />
      <div className="ambient ambient--fox" aria-hidden="true" />
      <main className="app-frame">
        <header className="app-header">
          <div>
            <span className="eyebrow">Guided conflict thinking</span>
            <h1>{stepTitle}</h1>
          </div>
          <p>Feel clearly. See clearly. Act strategically.</p>
        </header>

        <ProgressBar step={step} />
        <div className="view-shell" key={step}>
          {step === "home" ? (
            <HomeScreen onStart={handleStart} onDemo={handleDemo} />
          ) : null}

          {step === "input" ? (
            <InputScreen
              value={input}
              onChange={setInput}
              onBack={() => setStep("home")}
              onContinue={() => setStep("turtle")}
            />
          ) : null}

          {step === "turtle" ? (
            <StageScreen
              theme="turtle"
              analysis={analysis}
              onBack={() => setStep("input")}
              onContinue={() => setStep("owl")}
            />
          ) : null}

          {step === "owl" ? (
            <StageScreen
              theme="owl"
              analysis={analysis}
              onBack={() => setStep("turtle")}
              onContinue={() => setStep("fox")}
            />
          ) : null}

          {step === "fox" ? (
            <StageScreen
              theme="fox"
              analysis={analysis}
              onBack={() => setStep("owl")}
              onContinue={() => setStep("summary")}
            />
          ) : null}

          {step === "summary" ? (
            <SummaryScreen
              input={input}
              analysis={analysis}
              onBack={() => setStep("fox")}
              onRestart={() => {
                setInput(emptyInput);
                setStep("home");
              }}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
