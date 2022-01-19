import Layout from '../../components/Layout';
import Container from '../../components/Container';
import NewQuestionCard from '../../components/NewQuestionCard';
import { useEffect, useState } from 'react';
import {Question} from '../../types/Question';
import {createNewPoll} from '../../lib/createNewPoll';
import { useAuthContext } from '../../utils/AuthContext';
import { v4 as uuidv4} from 'uuid';
import Router from 'next/router';

const NewPage = () => {
  const newQuestion: Question = {
    uuid: uuidv4(),
    description: '',
    options: [''],
    multiple: false,
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([newQuestion]);
  const [sent, setSent] = useState(false);
  const {currentUser} = useAuthContext();

  useEffect(() => {
    setSent(false);
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <div className="pt-5">
            <div className="font-bold text-2xl border-b mb-5">新規投票フォーム</div>

            <div className="text-sm mb-1">投票のタイトル</div>
            <input
              className="font-bold mb-3 text-2xl py-2 px-4 w-full rounded-lg shadow focus:outline-none focus:ring-1"
              value={title} onChange={e => setTitle(e.target.value)}
              placeholder="タイトルを入力..." />

            <div className="text-sm mb-1">説明</div>
            <textarea
              rows={3}
              className=" py-2 mb-3 px-4 w-full rounded-lg shadow focus:outline-none focus:ring-1"
              value={description} onChange={e => setDescription(e.target.value)} 
              placeholder="説明を入力..."
              />
            <div>
            <div className="text-sm mb-2">質問カード</div>
            {questions.map((_question, index) => {
              return (
                <div key={index}>
                  <NewQuestionCard 
                    index={index}
                    questions={questions}
                    setQuestions={setQuestions}
                   />
                </div>
              )
            })}
            </div>

            <div className="flex">
            <div
              onClick={() => {
                setQuestions([...questions, newQuestion]);
              }}
             className="bg-blue-500 hover:bg-blue-600 mb-3 cursor-pointer text-sm font-bold text-white rounded-lg px-3 py-1">質問カードを追加 +</div>
            </div>
            <div className="flex justify-end">
              <div
                onClick={async () => {
                  setSent(true);
                  const pollId = await createNewPoll(title, description, questions, currentUser);
                  if(pollId) {
                    Router.push(`/polls/${pollId}`);
                  } else {
                    setSent(false);
                  }
                }}
                className={
                  sent ?
                  "bg-gray-300 cursor-wait rounded-full px-4 py-2 text-white font-bold"
                  :
                  "bg-green-600 hover:bg-green-700 cursor-pointer rounded-full px-4 py-2 text-white font-bold"
                }>作成 →</div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default NewPage;