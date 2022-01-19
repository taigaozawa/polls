import { Question } from "../types/Question";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { User } from "firebase/auth";
import { PollRequest } from "../types/PollRequest";

export const createNewPoll = async (title: string, description: string, questions: Question[], currentUser?: User | null) => {
  if (!currentUser) alert('ログインしてください。');
  try {
    const idToken = await currentUser?.getIdToken(true);
    const validatedQuestions = validateQuestions(questions);
    const pollRequest: PollRequest = {
      poll: {
        pollId: -1,
        title,
        description,
        questionUuids: questions.map(q => q.uuid),
        createdBy: currentUser?.uid || ''
      },
      questions: validatedQuestions
    }
    const response = await axios.post('/api/polls', pollRequest, {
      headers: {
        'authorization': idToken || '',
        'Accenpt': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const data = response.data
    return data?.pollId
  } catch (err) {
    alert(err);
  }
}

const validateQuestions = (questions: Question[]) => {
  if (!questions.length) {
    throw new Error('質問がありません。');
  }
  const validatedQuestions = questions.map(question => {
    if (!question.description) {
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