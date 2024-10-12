import React from 'react';
import { useNameManager } from "./lib/useNameManager";
import { Typo } from "@shared/ui";

type Props = {}

const NameIndicator: React.FC<Props> = () => {
  const { nickname } = useNameManager();

  return (
    <div className="flex">
      <Typo size={18} color="red" bold>{nickname}&nbsp;</Typo>
      <Typo size={18} bold>님</Typo>
    </div>
  );
}

export { useNameManager, NameIndicator };
