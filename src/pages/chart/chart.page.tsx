import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Page } from '../../layouts/page';
import { Chart } from '../../components/tracker/chart';
import { Heading } from '../../components/common/heading';
import { Pulse } from '../../components/common/pulse';

import { useCssVariables } from '../../hooks/useCssVariables';
import { useChartDataFormat } from '../../hooks/useChartDataFormat';
import marketStore from '../../store/markets'
import styles from './chart.module.scss';

export const ChartPage: FC = observer(() => {

  const { closeSocket, prices } = marketStore;
  const { chartData } = useChartDataFormat(prices);
  const { cssVarValues } = useCssVariables(['--secondary-1', '--secondary-2', '--secondary-3']);

  return (
    <Page.$>
      <div className={styles.chart}>
        <Link to='/' onClick={closeSocket} className={styles.chart__changeMarkets}>&larr; Change Markets</Link>
        <Heading.$ level={Heading.Levels.h2} centered thin >
          <div className={styles.chart__title}>
            <div className={styles.chart__indicator}>
              <Pulse.$ trigger={JSON.stringify(chartData)} duration={3500} />
            </div>
            Live Crypto Tracker
          </div>
        </Heading.$>
        <Chart.$ data={chartData} colors={cssVarValues} />
      </div>
    </Page.$>
  )
})
