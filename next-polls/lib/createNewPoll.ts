import { Question } from "../types/Question";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { User } from "firebase/auth";

export const createNewPoll = async (title: string, description: string, questions: Question[], currentUser?: User | null) => {
  const idToken = await currentUser?.getIdToken(true);
  try {
    const validatedQuestions = validateQuestions(questions);
    axios.post('/api/polls', {
      title, description,
      questions: validatedQuestions
    }, {
      headers: {
        'authorization': idToken || '',
        'Accenpt': 'application/json',
        'Content-Type': 'application/json'
      }
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