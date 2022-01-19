import Router, { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import ResultCard from '../../../components/ResultCard';
import { Poll } from '../../../types/Poll';
import useSWR from 'swr';
import axios from 'axios';
import { useAuthContext } from '../../../utils/AuthContext';

const ResultPage = () => {
  const { currentUser } = useAuthContext();

  const router = useRouter();
  const { pollId } = router.query;

  const pollFetcher = (url: string) => {
    if (url.match(/undefined/)) {
      return;
    }
    return axios(url).then(res => res.data);
  }
  const pollApiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/polls/${pollId}`
  const { data: pollData, error: pollError } = useSWR(pollApiUrl, pollFetcher, {
    shouldRetryOnError: false
  });

  const poll: Poll = pollData;
  const questionUuids: string[] = poll?.questionUuids;

  return (
    <>
      <Layout>
        <Container>
          <div className="pt-5">
            <div className="text-gray-600">#{pollId}</div>

            {pollError
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
                      <ResultCard index={index} questionUuid={questionUuid}/>
                    </div>
                  )
                })}

              </div>)
            }
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default ResultPage;