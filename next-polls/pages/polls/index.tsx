import Container from '../../components/Container';
import Layout from '../../components/Layout';
import PollList from '../../components/PollList';
import NewPollButton from '../../components/NewPollButton';
import IdInputCard from '../../components/IdInputCard';

const PollsPage = () => {
  return (
    <>
      <Layout>
        <Container>
          <NewPollButton />
          <IdInputCard />
          <PollList /> 
        </Container>
      </Layout>
    </>
  )
}

export default PollsPage;