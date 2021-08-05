import {TaskNote, TaskStatus} from "./models/taskNote";
import {TaskComment} from "./models/taskComment";

export const TASKS: TaskNote[] = [
  {
    id: 1,
    title: 'Tee luonas',
    description: 'Keitä perunat, leikkaa salaatti ja paista kana.',
    commentIds: [4],
    status: TaskStatus.Pending,
    created: new Date()
  },
  {
    id: 2,
    title: 'Kävelytä koira',
    description: 'Aamuisin ja iltaisin kävely lenkki, jotta koira saa tehtyä asiansa.',
    commentIds: [],
    status: TaskStatus.InProgress,
    created: new Date()
  },
  {
    id: 3,
    title: 'Testi',
    description: 'Toimiiko tämä?',
    commentIds: [5, 6],
    status: TaskStatus.InProgress,
    created: new Date()
  }
];

export const COMMENTS: TaskComment[] = [
  {
    id: 4,
    content: 'Moro :)',
    created: new Date()
  },
  {
    id: 5,
    content: 'WIIIWUUUWIIIIWUUU!',
    created: new Date()
  },
  {
    id: 6,
    content: 'Nyt toimii!',
    created: new Date()
  }
];
