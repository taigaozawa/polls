import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Container from '../../components/Container';
import QuestionCard from '../../components/QuestionCard';
import { Poll } from '../../types/Poll';
import auth from 'firebase/auth';
import useSWR from 'swr';
import axios from 'axios';

const PollPage = () => {
  const router = useRouter();
  const { pollId } = router.query;

  const pollFetcher = (url: string) => {
    if (!url) {
      console.log('undefinedです');
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

  return (
    <>
      <Layout>
        <Container>
          <div className="pt-5">
            <div className="text-gray-600">#{pollId}</div>

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
                    <div>
                      <QuestionCard index={index} questionUuid={questionUuid} />
                    </div>
                  )
                })}

                {poll &&<div className="flex justify-end">
                  <div
                    onClick={() => alert('回答')}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer rounded-full px-4 py-2 text-white font-bold">回答して結果を見る →</div>
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