import type { StageTheme } from "../types/panel";

type StageMedallionProps = {
  theme: StageTheme;
  emoji: string;
  label: string;
  size?: "default" | "large";
};

export function StageMedallion({
  theme,
  emoji,
  label,
  size = "default",
}: StageMedallionProps) {
  return (
    <div className={`stage-medallion stage-medallion--${theme} stage-medallion--${size}`}>
      <div className="stage-medallion__ring">
        <div className="stage-medallion__core">
          <span aria-hidden="true">{emoji}</span>
        </div>
      </div>
      <span className="stage-medallion__label">{label}</span>
    </div>
  );
}
