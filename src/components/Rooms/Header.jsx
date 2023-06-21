import Heading from '../Heading/Heading';

const Header = ({ roomData }) => {
    return (
        <>
            <Heading
                title={roomData.title}
                subtitle={roomData.location}
            />
            <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
                <img
                    className='object-fit w-full h-full'
                    src={roomData.image}
                    alt='header image'
                />
            </div>
        </>
    );
};

export default Header;