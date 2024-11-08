import type { Task as TaskProps } from '../../types';
import { Typo } from '@shared/ui';

export const Task: React.FC<TaskProps> = ({ iconSrc, text }) => {
  return (
    <article className="w-full min-h-[52px] h-[52px] p-4 rounded-[8px] border border-slate-100 flex gap-x-4 items-center">
      <img src={iconSrc} alt={text} />
      <Typo size={14} color="sub" bold>
        {text}
      </Typo>
    </article>
  );
};
