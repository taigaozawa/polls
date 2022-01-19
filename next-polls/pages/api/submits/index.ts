import {NextApiRequest, NextApiResponse} from 'next';
import {Poll} from '../../../types/Poll';
import adminApp from '../../../utils/admin';
import admin from 'firebase-admin';
import { connectToDb } from '../../../lib/db';
import {Submit} from '../../../types/Submit';
import {SubmitRequest} from '../../../types/SubmitRequest';
import { Answer } from '../../../types/Answer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newSubmitRequest: SubmitRequest = req.body;
  const newSubmit: Submit = newSubmitRequest.submit;
  const newAnswers: Answer[] = newSubmitRequest.answers;

  const idToken = req.headers.authorization;

  const verified = idToken ? await admin.auth(adminApp).verifyIdToken(idToken) : null;

  const {db} = await connectToDb();

  const insertPoll = async (newPoll: Poll) => {
    const doc = await db.collection('counters').findOneAndUpdate(
      {key: 'pollId'},
      {$inc: {seq: 1}},
      {upsert: true }
    );
    const incrementId = Number(doc?.value?.seq);
    if(!incrementId) {
      insertPoll(newPoll);
    } else {
      const newPollWithIncrementId: Poll = {
        ...newPoll,
        pollId: incrementId
      }
      db.collection('polls').insertOne(newPollWithIncrementId);
    }
    return incrementId;
  }
  
  switch(req.method) {
    case 'POST':
      try {
        if (newSubmit.createdBy === verified?.uid) {
          db.collection('submits').insertOne(newSubmit);
          console.log('newAnswers' + newAnswers);
          newAnswers.forEach(newAnswer => {
            db.collection('answers').insertOne(newAnswer);
          })
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
        const pollsData = await db.collection('polls').find().toArray();
        res.status(200).json(pollsData);
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