const Animal = require("../assets/images/animal.png");
const Art = require("../assets/images/art.png");
const Vehicle = require("../assets/images/vehicle.png");

export const getCategoryImg = (category: string) => {
  switch (category) {
    case "Animal":
      return Animal;
    case "Art":
      return Art;
    case "Vehicle":
      return Vehicle;
    default:
      return Animal;
  }
};
