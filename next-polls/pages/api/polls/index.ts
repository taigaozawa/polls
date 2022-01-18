import {NextApiRequest, NextApiResponse} from 'next';
import {Poll} from '../../../types/Poll';
import adminApp from '../../../utils/admin';
import admin from 'firebase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newPoll: Poll = req.body;
  const idToken = req.headers.authorization;

  const verified = await admin.auth(adminApp).verifyIdToken(idToken || '')
  
  switch(req.method) {
    case 'POST':
      try {
        res.status(200).json(JSON.stringify(verified));
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    case 'GET':
      break;
    default:
      break;
  }
}

export default handler;