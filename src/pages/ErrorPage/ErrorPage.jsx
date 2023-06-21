import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Container from '../../components/Shared/Container';
import img from '../../assets/404-Aircnc.gif';

const ErrorPage = () => {
    return (
        <>
            <Helmet>
                <title>Vacation Homes & Condo Rentals - AirCNC</title>
            </Helmet>
            <Container>
                <div className='min-h-[calc(100vh-170px)] flex items-center'>
                    <div className='w-full'>
                        <h2 className='text-3xl font-semibold'>We can&apos;t seem to find the page you&apos;re looking for</h2>
                        <div className='mt-10 flex flex-col md:flex-row gap-10 justify-between'>
                            <div>
                                <h3 className='text-lg'>Here are some helpful links instead:</h3>
                                <Link to='/'><li className='text-lg list-none underline'>Home</li></Link>
                            </div>
                            <div className='flex justify-center'>
                                <img src={img} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ErrorPage;