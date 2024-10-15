import { Button, Input, ModalButtonSection, Typo, useModal } from '@shared/ui';
import { useMemo, useState } from 'react';
import { generateRandomNickname, useNameManager } from '@features/nickname';

export const useNicknameChanger = () => {
  const { createModal } = useModal();

  const [_, open] = useMemo(
    () =>
      createModal({
        header: (
          <div className="w-full flex justify-center">
            <Typo size={24} bold>
              사용자 이름 변경
            </Typo>
          </div>
        ),
        node: ({ close }) => {
          const { nickname, changeNickname } = useNameManager();
          const [nick, setNick] = useState(() => nickname as string);

          const change = () => {
            if (nick.trim() === '') {
              return alert('공백을 설정할 수 없습니다.');
            }
            changeNickname(nick);
            close();
          };

          return (
            <div className="col">
              <Typo size={14} bold>
                사용자 이름
              </Typo>
              <Input
                defaultValue={nick}
                onChange={(e) => setNick(e.target.value)}
                placeholder={generateRandomNickname()}
              />
              <ModalButtonSection>
                <Button className="!h-[42px] flex-[0.7]" onClick={change}>
                  변경했어요.
                </Button>
                <Button
                  className="!h-[42px] flex-[0.3]"
                  theme="white"
                  onClick={close}
                >
                  닫기
                </Button>
              </ModalButtonSection>
            </div>
          );
        },
        options: {
          noContent: true,
        },
      }),
    [],
  );

  console.log({ open });

  return open;
};