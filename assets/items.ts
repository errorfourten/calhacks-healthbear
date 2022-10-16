import { BearItem } from '../models/BearModel'

const itemData: BearItem[] = [
  {
    "id": 1,
    "name": "apple",
    "category": "food",
    "cost": 10,
    "points": 10,
    "imagePath": require("./steak.jpg")
  },
  {
    "id": 2,
    "name": "steak",
    "category": "food",
    "cost": 20,
    "points": 30,
    "imagePath": require("./steak.jpg")
  },
  {
    "id": 3,
    "name": "pet",
    "category": "social",
    "cost": 5,
    "points": 10,
    "imagePath": require("./steak.jpg")
  },
  {
    "id": 4,
    "name": "toy",
    "category": "social",
    "cost": 25,
    "points": 35,
    "imagePath": require("./steak.jpg")
  }
]

export default itemData