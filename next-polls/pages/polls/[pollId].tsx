import {useRouter} from 'next/router';
import Layout from '../../components/Layout';
import Container from '../../components/Container';
import QuestionCard from '../../components/QuestionCard';

const PollPage = () => {
  const router = useRouter();
  const {pollId} = router.query;
  return (
  <>
  <Layout>
    <Container>
    <div className="pt-5">
      <div className="text-gray-600">#{pollId}</div>
      <div className="font-bold text-2xl">アンケート！！</div>
      <div className="text-gray-600 mt-1">例えば例文例えば例文例えば例文例えば例文例えば例文例えば例文例えば例文文例えば例文例えば例文文例えば例文例えば例文文例えば例文例えば例文文例えば例文例えば例文文例えば例文例えば例文</div>
      <div className="text-gray-600 text-sm mt-2">作成者: xxxxXXX</div>

      <div className="mt-5">
        <QuestionCard questionId={1} questionText='サンプル問題' multiple={false} options={['aaa', 'bbb', 'ccc']} />
        <QuestionCard questionId={2} questionText='サンプル問題' multiple={true} options={['aaa', 'bbb', 'ccc']} />
      </div>

      <div className="flex justify-end">
        <div
        onClick={() => alert('回答')} 
        className="bg-red-600 hover:bg-red-700 cursor-pointer rounded-full px-4 py-2 text-white font-bold">回答して結果を見る →</div>
      </div>
    </div>
    </Container>
    </Layout>
  </>
  );
};

export default PollPage;