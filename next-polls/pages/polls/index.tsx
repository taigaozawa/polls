import Container from '../../components/Container';
import Layout from '../../components/Layout';
import PollList from '../../components/PollList';
import NewPollButton from '../../components/NewPollButton';
import IdInputCard from '../../components/IdInputCard';
import { Poll } from '../../types/Poll';
import axios from 'axios';
import useSWR from 'swr';

const PollsPage = () => {

  const fetcher = (url: string) => axios(url).then(res => {
    return res.data;
  })
  const apiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/polls`
  const { data } = useSWR(apiUrl, fetcher);

  const polls: Poll[] = data
  return (
    <>
      <Layout>
        <Container>
          <NewPollButton />
          <IdInputCard />
          <PollList polls={polls} /> 
        </Container>
      </Layout>
    </>
  )
}

export default PollsPage;