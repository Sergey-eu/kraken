/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartDataItem } from '../../../types';

import { useCssVariables } from '../../../hooks/useCssVariables';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import markets from '../../../store/markets';
import styles from './chart.module.scss';

export namespace Chart {

  export type Props = Readonly<{
    data: ChartDataItem
    colors?: string[]
  }>

  export const $: FC<Props> = (props) => {
    const { data, colors } = props;
    const [chartStoredHistory, setChartStoredHistory] = useLocalStorage('chartData', []);
    const initialChartData = chartStoredHistory.length ? JSON.parse(chartStoredHistory) : data;
    const [dataHistory, setDataHistory] = useState<ChartDataItem[]>(initialChartData);
    const { cssVariables } = useCssVariables(['--mono-1', '--primary-3']);

    useEffect(() => {
      markets.startSocket();
      markets.readSocket();
    }, []);

    useEffect(() => {
      const newData = (dataHistory.length > 0) ? [...dataHistory, data] : [data];
      setDataHistory(newData.filter(value => Object.keys(value).length !== 0).slice(-50));
      setChartStoredHistory(JSON.stringify(newData));
    }, [data]);

    const uniqueLines = Object.keys(data);

    const CustomXAxisTick = (props: any) => {
      const { x, y, payload } = props;

      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill={cssVariables['--mono-1']} transform="rotate(-35)" fontSize={12}>
            {moment(payload.value).format('hh:mm:ss')}
          </text>
        </g>
      );
    };

    const CustomYAxisTick = (props: any) => {
      const { x, y, payload } = props;

      return (
        <g transform={`translate(${x},${y})`}>
          <text x={-4} y={0} textAnchor="end" fill={cssVariables['--primary-3']} fontSize={13} fontWeight={700} >
            {payload.value}
          </text>
        </g>
      );
    };

    const CustomTooltip = (props: any) => {
      const { active, payload } = props;

      if (active && payload && payload.length) {
        const time = new Date(payload[0].payload.time).toLocaleString();
        const data = { ...payload[0].payload };
        delete data.time;

        return (
          <div className={styles.chart__tooltip}>
            <div className={styles.chart__tooltipLabel}>{time}</div>
            <div className={styles.chart__tooltipContent}>
              {Object.keys(data).map((key, i) => {
                return (
                  <div key={key} style={{ color: colors?.[i] }}>{key} : {data[key]}</div>
                );
              })}
            </div>
          </div>
        );
      }

      return null;
    };

    return (
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataHistory}>
            <Legend verticalAlign='top' height={45} />
            <CartesianGrid strokeDasharray="2 2" />
            <YAxis tick={<CustomYAxisTick />} domain={[(dataMin: number) => Math.round(dataMin * 0.9998), (dataMax: number) => Math.round(dataMax * 1.0002)]} />
            <XAxis dataKey={'time'} tick={<CustomXAxisTick />} height={45} />
            {uniqueLines.map((market, i) => market !== 'time' &&
              <Line key={market} connectNulls type="monotone" dataKey={market} stroke={colors?.[i]} fill={colors?.[i]} />
            )}
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
}
