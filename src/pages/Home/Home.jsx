import { Helmet } from 'react-helmet-async';
import Categories from '../../components/Categories/Categories';
import Rooms from '../../components/Rooms/Rooms';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Vacation Homes & Condo Rentals - AirCNC</title>
            </Helmet>
            <Categories />
            <Rooms />
        </>
    );
};

export default Home;