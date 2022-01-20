import Router, { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import QuestionCard from '../../../components/QuestionCard';
import { Poll } from '../../../types/Poll';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { createNewSubmit } from '../../../lib/createNewSubmit';
import { Submit } from '../../../types/Submit';
import { useEffect, useState } from 'react';
import { Answer } from '../../../types/Answer';
import { useAuthContext } from '../../../utils/AuthContext';
import SkeltonCard from '../../../components/SkeltonCard';

const PollPage = () => {
  const [submit, setSubmit] = useState<Submit>({
    pollId: -1,
    createdBy: ''
  });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [sent, setSent] = useState(false);

  const { currentUser } = useAuthContext();

  const router = useRouter();
  const { pollId } = router.query;

  const pollFetcher = async (url: string) => {
    if (url.match(/undefined/)) {
      return;
    }
    const idToken = await currentUser?.getIdToken();
    return axios(url, {
      headers: {
        'authorization': idToken || '',
        'Accenpt': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.data);
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/polls/${pollId}`
  const { data, error } = useSWR(apiUrl, pollFetcher, {
    shouldRetryOnError: false
  });

  const poll: Poll = data?.poll;
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
  }, [poll?.questionUuids]);

  useEffect(() => {
    mutate(apiUrl);
  }, [currentUser]);

  useEffect(() => {
    if (data?.submitted && pollId) {
      Router.push(`/polls/${pollId}/result`)
    }
  }, [data?.submitted])
  
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
                <div className="font-bold text-2xl">{poll?.title || '.'}</div>
                <div className="text-gray-600 mt-1 mb-5">{poll?.description || '.'}</div>
                <div
                 onClick={() => {Router.push(`/polls/${pollId}/result`);}}
                 className="flex justify-end mt-2 text-sm cursor-pointer text-gray-500 mb-5">回答しないで結果を見る →
                 </div>
                <div>
                  {questionUuids?.length ?
                  <div>
                {questionUuids?.map((questionUuid, index) => {
                  return (
                    <div key={index}>
                      <QuestionCard index={index} questionUuid={questionUuid} answers={answers} setAnswers={setAnswers} />
                    </div>
                  )
                })}
                </div>
                :
                <div>
                  <div className="mb-3">
                  <SkeltonCard />
                  </div>
                  <div className="mb-3">
                  <SkeltonCard />
                  </div>
                  <div className="mb-3">
                  <SkeltonCard />
                  </div>
                </div>
              }
                </div>

                {poll && <div className="flex justify-end">
                  <div
                    onClick={async () => {
                      setSent(true);
                      const result = await createNewSubmit(answers, submit, currentUser);
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
                <div
                 onClick={() => {Router.push(`/polls/${pollId}/result`);}}
                 className="flex justify-end mt-2 text-sm cursor-pointer text-gray-500">回答しないで結果を見る →
                 </div>
              </div>)
            }
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default PollPage;