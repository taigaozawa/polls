import {NextApiRequest, NextApiResponse} from 'next';
import {Poll} from '../../../types/Poll';
import adminApp from '../../../utils/admin';
import admin from 'firebase-admin';
import { connectToDb } from '../../../lib/db';
import { PollRequest } from '../../../types/PollRequest';
import { Question } from '../../../types/Question';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newPollRequest: PollRequest = req.body;
  const newPoll: Poll = newPollRequest.poll;
  const newQuestions: Question[] = newPollRequest.questions;

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
    return incrementId
  }
  
  switch(req.method) {
    case 'POST':
      try {
        if (newPoll.createdBy === verified?.uid) {
          const pollId = await insertPoll(newPoll)
          newQuestions.forEach(newQuestion => {
            db.collection('questions').insertOne(newQuestion);
          })
          res.status(200).json({pollId});
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