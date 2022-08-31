import { autorun, makeAutoObservable, runInAction } from 'mobx';

import { ThreadDataItem } from '../types';

class TrackingStore {
  socket: WebSocket | undefined;
  prices: ThreadDataItem[] = [];
  markets: string[] = [];

  constructor () {
    makeAutoObservable(this);

    const name = 'markets';
    const storedJson = localStorage.getItem(name);

    if (storedJson) Object.assign(this, JSON.parse(storedJson));

    autorun(() => {
      localStorage.setItem(name, JSON.stringify(this));
    });
  }

  startSocket = () => {
    this.socket = new WebSocket('wss://ws.kraken.com/a');
    this.socket.onopen = () =>
      this.socket?.send(
        JSON.stringify({
          event: 'subscribe',
          pair: this.markets,
          subscription: {
            name: 'ticker'
          }
        })
      );
  };

  readSocket = () => {
    if (this.socket != null) {
      this.socket.onmessage = (event: { data: string }) => {
        const newMessage = JSON.parse(event.data);

        if (newMessage.length) {
          const threadName = newMessage[3];
          const threadData = newMessage[1].c[0];

          const threadIdx = this.prices.findIndex(
            (thread: ThreadDataItem) => thread.name === threadName
          );
          runInAction(() => {
            threadIdx < 0
              ? this.prices.push({ name: threadName, data: Number(threadData) })
              : (this.prices[threadIdx].data = Number(threadData));
          });
        }
      };
    }
  };

  closeSocket = () => {
    this.socket?.close();
    this.prices = [];
  };

  setMarkets = (selectedMarkets: string[]) => {
    this.markets = selectedMarkets;
  };
}

export default new TrackingStore();
