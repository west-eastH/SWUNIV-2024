import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import { generateRandomNickname } from '@features/nickname';
import ga from 'react-ga4';

type NameStoreStates = {
  nickname?: string;
  setNickname: (nickname?: string) => void;
};

const useNameStore = create(
  persist<NameStoreStates>(
    (set) => ({
      setNickname: (nickname) => set({ nickname }),
    }),
    {
      name: 'name-store',
    },
  ),
);

export const useNameManager = () => {
  const { nickname, setNickname } = useNameStore();

  const generateNickname = () => generateRandomNickname();

  const changeNickname = (newNickname: string) => {
    setNickname(newNickname);
    ga.event({
      category: '상호작용',
      action: '닉네임 변경',
      label: `${nickname} 에서 ${newNickname} 으로 변경`,
    });
  };

  const exit = () => setNickname(undefined);

  return {
    nickname,
    generateNickname,
    changeNickname,
    exit,
  };
};
