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
      <div className="text-gray-600 mt-1">これはこの投票フォームの説明文です。例文です例文です例文です例文です。例文です例文です例文です例文です。回答したら結果を見ることができます。</div>
      <div className="text-gray-600 text-sm mt-2">作成者: xxxxXXX</div>

      <div className="mt-5">
        <QuestionCard questionId={1} questionText='サンプル質問です 1' multiple={false} options={['aaa', 'bbb', 'ccc']} />
        <QuestionCard questionId={2} questionText='サンプル質問です 2' multiple={true} options={['あああ', 'いいい', 'ううう']} />
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