import { useQuery } from 'react-query';
import { Spinner } from 'react-rainbow-components';
import request from '../axios';
import RequestList from '../components/Home/RequestList/RequestList';
import Item from './Item';

const Home = () => {
    const { isLoading, data: dataRequest } = useQuery('fetchRequest', () =>
        request.get('/requests'),
    );

    return (
        <div>
            {isLoading && <Spinner />}
            <RequestList requests={dataRequest?.data} />
        </div>
    );
};

export default Home;
