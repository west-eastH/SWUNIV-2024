import React, { useEffect, useRef, useState } from 'react';
import { Typo, TypoProps } from "@shared/ui";

type RotateTypoStates = Pick<TypoProps, "size" | "color"> & {
  text: string;
};

type Props = {
  contents: RotateTypoStates[];
}

export const TypingRotate: React.FC<Props> = ({ contents }) => {
  const [current] = useState<RotateTypoStates>(contents[0]);
  const typoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typo = typoRef.current;
    if (!typo) return;

    const draw = () => {
      const tokens = current.text.split('');
      let tokenIndex = 0;
      const intervalId = setInterval(() => {
        if (tokenIndex === tokens.length - 1) {
          return clearInterval(intervalId);
        }
        typo.innerText += tokens[tokenIndex];
        tokenIndex++;
      }, 500);

      return intervalId;
    };

    const drawIntervalId = draw();

    return () => {
      clearInterval(drawIntervalId);
    };
  }, []);

  return (
    <Typo size={13} ref={typoRef} />
  );
};
