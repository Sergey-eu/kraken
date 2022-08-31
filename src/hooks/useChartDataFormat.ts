import { ChartDataItem, ThreadDataItem } from "../types";

export const useChartDataFormat = (data: Array<ThreadDataItem>) => {
  const chartData: ChartDataItem = {};

  data.forEach((thread) => {
    const threadName = thread.name;
    chartData[threadName] = thread.data;
  });

  if (Object.keys(chartData).length) {
    chartData.time = Date.now();
  }

  return { chartData };
};
