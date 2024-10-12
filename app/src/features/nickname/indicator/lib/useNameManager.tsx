import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { generateRandomNickname } from "@features/nickname";

type NameStoreStates = {
  nickname?: string;
  setNickname: (nickname?: string) => void;
}

const useNameStore = create(
  persist<NameStoreStates>(set => ({
    setNickname: nickname => set({ nickname }),
  }), {
    name: "name-store"
  }),
);

export const useNameManager = () => {
  const { nickname, setNickname } = useNameStore();

  const generateNickname = () => generateRandomNickname();

  const changeNickname = (newNickname: string) => setNickname(newNickname);

  const exit = () => setNickname(undefined);

  return {
    nickname,
    generateNickname,
    changeNickname,
    exit,
  }
};
