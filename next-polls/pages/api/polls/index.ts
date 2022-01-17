import {NextApiRequest, NextApiResponse} from 'next';
import {db} from '../../../utils/admin';
import {Poll} from '../../../types/Poll';

const getNumberOfPolls = async (collectionRef:FirebaseFirestore.CollectionReference) => {
  const collection = await collectionRef.get();
  return collection.size;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newPoll: Poll = req.body;
  const pollsRef = db.collection('polls');
  const questionsRef = db.collection('questions');

  const pollId = await getNumberOfPolls(pollsRef) + 1
  
  switch(req.method) {
    case 'POST':
      try {
        await pollsRef.add({
          pollId,
          title: newPoll.title,
          description: newPoll.description,
          questionIds: newPoll.questions.map(q => q.questionId)
        });
        newPoll.questions.forEach(async question => {
          await questionsRef.add(question)
        })
        res.status(200).json({
          pollId,
          title: newPoll.title,
          description: newPoll.description,
          questionIds: newPoll.questions.map(q => q.questionId)
        });
      } catch (err) {
        res.status(500).json({message: err})
      }
      break;
    case 'GET':
      try {
        const size = await getNumberOfPolls(pollsRef);
        res.status(200).json({size});
      } catch (err) {
        res.status(500).json({message: err})
      }
      break;
    default:
      break;
  }
}

export default handler;