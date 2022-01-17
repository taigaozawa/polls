import {Question} from './Question';

export type Poll = {
  pollId: number;
  title: string;
  description: string;
  questions: Question[];
}