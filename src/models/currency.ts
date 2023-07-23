type Currency = {
  key: string;
  name: string;
  symbol: string;
};
export type CurrencyRates = {
  date: string;
  base: string;
  keys: string[];
  values: number[];
};

export default Currency;
