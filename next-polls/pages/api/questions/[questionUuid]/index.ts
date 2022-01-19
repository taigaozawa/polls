import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb } from '../../../../lib/db';

export const getQuestion = async (db: Db, questionUuid: string) => {
  const foundQuestion = await db.collection('questions').findOne({
    uuid: questionUuid.toString()
  });
  return foundQuestion;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { questionUuid } = req.query;

  const { db } = await connectToDb();

  switch (req.method) {
    case 'GET':
      try {
        if (typeof questionUuid === 'string') {
          const foundQuestion = await getQuestion(db, questionUuid);
          if (foundQuestion) {
            res.status(200).json(foundQuestion);
            return;
          }
        }
        res.status(404).json({ message: 'Not Found.' });
      } catch (err) {
        res.status(500).json({ message: err || 'Server Error.' })
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed.' })
      break;
  }
}

export default handler;