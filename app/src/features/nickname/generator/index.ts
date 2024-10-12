import { selectRand } from "./lib/selectRand";
import { animals, adjectives } from "./consts/parts";
import { nanoid } from "nanoid";

export const generateRandomNickname = () => {
  const identifier = nanoid(3);
  const prefix = getAdjective();
  const name = getAnimal();

  return `${prefix} ${name}_${identifier}`;
};


const getAdjective = () => selectRand(adjectives);
const getAnimal = () => selectRand(animals);
