import "./chart.sass";

const CHART_WIDTH = 50;
const CHART_PARTS = 5;
const COLORS = ["#A8DA81", "#A8DA81", "#FFF96B", "#F87045"];
const TEXT = ["Brez težav", "Preprosto", "Zahtevno", "Izjemo zahtevno"];

interface ChartProps {
  difficulty: number;
}

const Chart = ({ difficulty }: ChartProps) => {
  // Scale to [0, CHART_PARTS]
  const scaledDifficulty = difficulty / (100 / CHART_PARTS);

  // Round to nearest integer and ensure the result is between 1 and CHART_PARTS - 1
  const roundedDifficulty = Math.min(
    CHART_PARTS - 1,
    Math.max(1, Math.round(scaledDifficulty))
  );

  return (
    <div className="chart-container">
      <div className="chart-background" style={{ width: `${CHART_WIDTH}px` }}>
        <div
          className="chart-value"
          style={{
            width: `calc(${roundedDifficulty} * ${
              CHART_WIDTH / CHART_PARTS
            }px)`,
            backgroundColor: COLORS[roundedDifficulty - 1],
          }}
        ></div>
      </div>
      <p
        className="chart-text"
        style={{
          color: COLORS[roundedDifficulty - 1],
        }}
      >
        {TEXT[roundedDifficulty - 1]}
      </p>
    </div>
  );
};

export default Chart;
