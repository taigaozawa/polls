import {Poll} from './Poll';
import {Question} from './Question';

export type PollRequest = {
  poll: Poll;
  questions: Question[];
}