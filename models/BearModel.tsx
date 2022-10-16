interface BearStatus {
  food: number;
  social: number;
}

interface BearItem {
  id: number;
  name: string;
  category: string;
  cost: number;
  points: number;
  imagePath: any;
}

export { BearStatus, BearItem }