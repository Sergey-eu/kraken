import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { Page } from '../../layouts/page';
import { MultiSelect } from '../../components/tracker/multi-select';
import { Heading } from '../../components/common/heading';

import { tradingPairs } from '../../store/data/mock';
import marketStore from '../../store/markets'
import styles from './home.module.scss';

export const HomePage: FC = observer(() => {

  const { setMarkets, markets } = marketStore;

  const handleSelect = (markets: Array<string>) => {
    window.localStorage.setItem('chartData', '[]');
    setMarkets(markets)
  }

  return (
    <Page.$>
      <div className={styles.home}>
        <Heading.$ level={Heading.Levels.h1} centered thin text='Live Crypto Tracker' />
        <div className={styles.home__panel}>
          <MultiSelect.$ options={tradingPairs} selected={markets} onChange={handleSelect} />
          <Link to='/chart' className={styles.home__panelAction}>Track</Link>
        </div>
      </div>
    </Page.$>
  )
})
