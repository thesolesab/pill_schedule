export interface WeightEntry {
  weight: number;
  date: string; // или Date, если будете работать с объектами Date
}


export interface User {
  username: string,
  userHeight: number,
  weightHistory: WeightEntry[],
}
