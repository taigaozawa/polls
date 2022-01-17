import Layout from '../../components/Layout';
import Container from '../../components/Container';
import NewQuestionCard from '../../components/NewQuestionCard';
import { useState } from 'react';
import {Question} from '../../types/Question';
import {createNewPoll} from '../../lib/createNewPoll';

const NewPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  return (
    <>
      <Layout>
        <Container>
          <div className="pt-5">
            <div className="font-bold  text-gray-700 border-b mb-5">新しい投票を作成</div>

            <input
              className="font-bold mb-3 text-2xl py-2 px-4 w-full rounded-lg shadow focus:outline-none focus:ring-1"
              value={title} onChange={e => setTitle(e.target.value)}
              placeholder="タイトルを入力..." />

            <textarea
              rows={3}
              className=" py-2 mb-3 px-4 w-full rounded-lg shadow focus:outline-none focus:ring-1"
              value={description} onChange={e => setDescription(e.target.value)} 
              placeholder="説明を入力..."
              />
            <div>
            <div className="text-sm mb-2">質問カード</div>
            {questions.map((question, index) => {
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
                const newQuestion: Question = {
                  questionId: questions.length + 1,
                  questionText: '',
                  options: [''],
                  multiple: false,
                }
                setQuestions([...questions, newQuestion]);
              }}
             className="bg-blue-500 hover:bg-blue-600 mb-3 cursor-pointer text-sm font-bold text-white rounded-lg px-3 py-1">質問カードを追加 +</div>
            </div>
            <div className="flex justify-end">
              <div
                onClick={() => createNewPoll(title, description, questions)}
                className="bg-green-600 hover:bg-green-700 cursor-pointer rounded-full px-4 py-2 text-white font-bold">作成 →</div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default NewPage;