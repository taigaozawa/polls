import Router, { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import QuestionCard from '../../../components/QuestionCard';
import { Poll } from '../../../types/Poll';
import auth from 'firebase/auth';
import useSWR from 'swr';
import axios from 'axios';
import { createNewSubmit } from '../../../lib/createNewSubmit';
import { Submit } from '../../../types/Submit';
import { useEffect, useState } from 'react';
import { Answer } from '../../../types/Answer';
import { useAuthContext } from '../../../utils/AuthContext';

const PollPage = () => {
  const [submit, setSubmit] = useState<Submit>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [sent, setSent] = useState(false);

  const { currentUser } = useAuthContext();

  const router = useRouter();
  const { pollId } = router.query;

  const pollFetcher = (url: string) => {
    if (url.match(/undefined/)) {

      return;
    }
    return axios(url).then(res => res.data);
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/polls/${pollId}`
  const { data, error } = useSWR(apiUrl, pollFetcher, {
    shouldRetryOnError: false
  });

  const poll: Poll = data;
  const questionUuids: string[] = poll?.questionUuids;

  useEffect(() => {
    const uid = currentUser?.uid;
    if (!uid) return;
    if (pollId && typeof pollId === 'string') {
      setSubmit({
        pollId: Number(pollId),
        createdBy: uid
      })
    }
  }, [currentUser, pollId]);

  useEffect(() => {
    const emptyAnswers: Answer[] = poll?.questionUuids.map(questionUuid => {
      return {
        questionUuid: questionUuid,
        indexes: [],
        createdBy: ''
      }
    });
    setAnswers(emptyAnswers);
  }, [poll?.questionUuids])

  useEffect(() => {
    setSent(false);
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <div className="pt-5">
            <div className="text-gray-600 mb-1">#{pollId}</div>

            {error
              ? (
                <div>
                  <div className="font-bold text-2xl mt-2">見つかりません。</div>
                  <div className="font-bold text-lg">404 Not Found</div>
                </div>
              )
              :
              (<div>
                <div className="font-bold text-2xl">{poll?.title}</div>
                <div className="text-gray-600 mt-1 mb-5">{poll?.description}</div>

                {questionUuids?.map((questionUuid, index) => {
                  return (
                    <div key={index}>
                      <QuestionCard index={index} questionUuid={questionUuid} answers={answers} setAnswers={setAnswers} />
                    </div>
                  )
                })}

                {poll && <div className="flex justify-end">
                  <div
                    onClick={async () => {
                      if (!submit) {
                        alert('再試行してください。');
                        return;
                      }
                      setSent(true);
                      const result = await createNewSubmit(submit, answers, currentUser);
                      if (result) {
                        Router.push(`/polls/${pollId}/result`);
                      } else {
                        setSent(false);
                      }
                    }}
                    className={
                      sent ? 
                      "bg-gray-300 cursor-wait rounded-full px-4 py-2 text-white font-bold"
                    :
                    "bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-full px-4 py-2 text-white font-bold"
                  }
                    >
                      回答して結果を見る →
                      </div>
                </div>}

              </div>)
            }
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default PollPage;