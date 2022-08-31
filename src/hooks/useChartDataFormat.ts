import { ChartDataItem, ThreadDataItem } from '../types';

export const useChartDataFormat = (data: ThreadDataItem[]) => {
  const chartData: ChartDataItem = {};

  data.forEach((thread) => {
    const threadName = thread.name;
    chartData[threadName] = thread.data;
  });

  if (Object.keys(chartData).length > 0) {
    chartData.time = Date.now();
  }

  return { chartData };
};
