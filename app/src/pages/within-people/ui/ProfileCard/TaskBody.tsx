import { Typo } from '@shared/ui';
import { Task } from './Task';
import { Task as TaskProps } from '../../types';
import React from 'react';

type Props = {
  greet: string;
  tasks?: TaskProps[];
};

export const TaskBody: React.FC<Props> = ({ tasks, greet }) => {
  return (
    <div className="task-body task-body__shadow">
      <div className="pb-4">
        <Typo size={14}>{greet}</Typo>
      </div>
      <div className="col gap-y-2.5">
        {tasks?.map((task) => <Task {...task} />)}
      </div>
    </div>
  );
};
