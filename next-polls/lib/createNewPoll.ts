import { Question } from "../types/Question";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

export const createNewPoll = (title: string, description: string, questions: Question[]) => {
  try {
    const validatedQuestions = validateQuestions(questions);
    axios.post('/api/polls', {
      title, description,
      questions: validatedQuestions
    });
  } catch (err) {
    alert(err);
  }
}

const validateQuestions = (questions: Question[]) => {
  if (!questions.length) {
    throw new Error('質問がありません。');
  }
  const validatedQuestions = questions.map(question => {
    if (!question.questionText) {
      throw new Error('質問文がありません。')
    }
    const validatedOptions = question.options.filter(option => {
      return option !== '';
    })
    if (!validatedOptions.length) {
      throw new Error('選択肢がありません。');
    }
    return { ...question, questionId: uuidv4(), options: validatedOptions };
  });
  return validatedQuestions;
}