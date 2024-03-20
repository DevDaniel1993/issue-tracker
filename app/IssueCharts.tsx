"use client";

import { Pie } from "react-chartjs-2";
import "chart.js/auto";

interface Props {
  openIssues: number;
  inProgressIssues: number;
  closedIssues: number;
}

const PieChartComponent = ({
  openIssues,
  inProgressIssues,
  closedIssues,
}: Props) => {
  const data = {
    labels: ["Open Issues", "In-Progress Issues", "Closed Issues"],
    datasets: [
      {
        label: "Issues",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 0,
        data: [openIssues, inProgressIssues, closedIssues],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChartComponent;
