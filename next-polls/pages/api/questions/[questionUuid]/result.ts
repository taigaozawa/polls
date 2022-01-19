import {NextApiRequest, NextApiResponse} from 'next';
import { connectToDb } from '../../../../lib/db';
import { getQuestion } from '.';
import { Question } from '../../../../types/Question';
import { Db } from 'mongodb';
import { QuestionResult } from '../../../../types/QuestionResult';

const getNumberOfSubmits = async (db: Db, questionUuid: string) => {
  const foundAnswers = await db.collection('answers').find({
    questionUuid: questionUuid,
  }).toArray();
  return foundAnswers.length;
}

const getNumberOfSelection = async (db: Db, questionUuid: string, index: number) => {
  const foundAnswers = await db.collection('answers').find({
    questionUuid: questionUuid,
    indexes: {$in: [index]}
  }).toArray();
  return foundAnswers.length;
}

const getDistribution = async (db: Db, questionUuid: string, options: string[]) => {
  return await Promise.all(options.map(async (_option, index) => {
    return await getNumberOfSelection(db, questionUuid, index);
  }));
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {questionUuid} = req.query;
  const {db} = await connectToDb();  
  
  switch(req.method) {
    case 'GET':
      try {
        if (typeof questionUuid == 'string') {
          const numberOfSubmits = await getNumberOfSubmits(db, questionUuid);
          const foundQuestion = await getQuestion(db, questionUuid);
          const options: string[] = foundQuestion?.options;
          const distribution = await getDistribution(db, questionUuid, options);
          const questionResult: QuestionResult = {
            numberOfSubmits,
            distribution,
            myAnswers: []
          }
          res.status(200).json(questionResult);
        } else {
          res.status(404).json({message: 'Not Found.'});
        }
        
      } catch (err) {
        res.status(500).json({message: err || 'Server Error.'})
      }
      break;
    default:
      res.status(405).json({message: 'Method Not Allowed.'})
      break;
  }
}

export default handler;