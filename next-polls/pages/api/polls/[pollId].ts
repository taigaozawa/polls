import {NextApiRequest, NextApiResponse} from 'next';
import { connectToDb } from '../../../lib/db';
import { Db } from 'mongodb';
import admin from 'firebase-admin';
import adminApp from '../../../utils/admin';

const getSubmitted = async (db: Db, uid: string, pollId: number) => {
  const submit = await db.collection('submits').findOne({
    createdBy: uid,
    pollId: pollId
  });
  return submit ? true : false;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  const {pollId} = req.query;
  const {db} = await connectToDb();

  const idToken = req.headers.authorization;
  const verified = idToken ? await admin.auth(adminApp).verifyIdToken(idToken) : null;

  switch(req.method) {
    case 'GET':
      try {
        const foundPoll = await db.collection('polls').findOne({
          pollId: Number(pollId)
        });

        if (!foundPoll || typeof pollId !== 'string') {
          res.status(404).json({message: 'Not Found.'});
          return;
        } else {
          const submitted = await getSubmitted(db, verified?.uid || '', Number(pollId) );
          res.status(200).json({
            poll: foundPoll,
            submitted
          });
        }
      } catch (err) {
        res.status(500).json({message: err})
      }
      break;
    default:
      res.status(405).json({message: 'Method Not Allowed.'})
      break;
  }
}

export default handler;