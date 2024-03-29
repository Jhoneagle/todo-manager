import {TaskNote, TaskStatus} from "./types/taskNote";
import {TaskComment} from "./types/taskComment";

export const TASKS: TaskNote[] = [
  {
    id: 1,
    title: 'Tee luonas',
    description: 'Keitä perunat, leikkaa salaatti ja paista kana.',
    status: TaskStatus.Pending,
    created: new Date(),
  },
  {
    id: 2,
    title: 'Kävelytä koira',
    description: 'Aamuisin ja iltaisin kävely lenkki, jotta koira saa tehtyä asiansa.',
    status: TaskStatus.Done,
    created: new Date(),
    startDate: new Date('2021-06-12'),
    endDate: new Date('2021-07-28'),
  },
  {
    id: 3,
    title: 'Testi',
    description: 'Toimiiko tämä?',
    status: TaskStatus.InProgress,
    created: new Date(),
    startDate: new Date(),
  }
];

export const COMMENTS: TaskComment[] = [
  {
    id: 4,
    taskId: 1,
    title: 'MOI!',
    content: 'Moro :)',
    created: new Date()
  },
  {
    id: 5,
    taskId: 3,
    title: 'Hälyytys',
    content: 'WIIIWUUUWIIIIWUUU!',
    created: new Date()
  },
  {
    id: 6,
    taskId: 3,
    title: 'Testi kommentti',
    content: 'Nyt toimii!',
    created: new Date()
  }
];
