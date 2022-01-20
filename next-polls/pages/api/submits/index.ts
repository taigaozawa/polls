import {NextApiRequest, NextApiResponse} from 'next';
import {Poll} from '../../../types/Poll';
import adminApp from '../../../utils/admin';
import admin from 'firebase-admin';
import { connectToDb } from '../../../lib/db';
import {Submit} from '../../../types/Submit';
import {SubmitRequest} from '../../../types/SubmitRequest';
import { Answer } from '../../../types/Answer';
import { Db } from 'mongodb';


const insertSubmit = async (db: Db, newSubmit: Submit) => {
  await db.collection('submits').insertOne(newSubmit);  
}
const insertAnswers = async (db: Db, newAnswers: Answer[]) => {
  await newAnswers.forEach(newAnswer => {
    db.collection('answers').insertOne(newAnswer);
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newSubmitRequest: SubmitRequest = req.body;
  const newSubmit: Submit = newSubmitRequest.submit;
  const newAnswers: Answer[] = newSubmitRequest.answers;

  const idToken = req.headers.authorization;

  const verified = idToken ? await admin.auth(adminApp).verifyIdToken(idToken) : null;

  const {db} = await connectToDb();
  
  switch(req.method) {
    case 'POST':
      try {
        if (newSubmit.createdBy === verified?.uid) {
          await insertSubmit(db, newSubmit);
          await insertAnswers(db, newAnswers);
          res.status(200).json({message: 'OK.'});
        } else {
          res.status(401).json({message: 'Unauthorized.'});
        }
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    case 'GET':
      try {
        if (verified) {
          const uid = verified.uid;
        }
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    default:
      res.status(405).json({message: 'Method Not Allowed.'})
      break;
  }
}

export default handler;