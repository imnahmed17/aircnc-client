import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { formatDistance } from 'date-fns';
import Button from '../Button/Button';
import Calender from './Calender';
import BookingModal from '../Modal/BookingModal';

const RoomReservation = ({ roomData }) => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState({
        startDate: new Date(roomData?.dateRange?.split(" - ")[0]),
        endDate: new Date(roomData?.dateRange?.split(" - ")[1]),
        key: 'selection'
    });
    const totalDays = formatDistance(
        new Date(roomData?.dateRange?.split(" - ")[1]), 
        new Date(roomData?.dateRange?.split(" - ")[0])
    ).split(' ')[0];
    const totalPrice = parseFloat(totalDays) * roomData.price;
    const bookingInfo = {
        guest: { name: user.displayName, email: user.email, image: user.photoURL },
        host: roomData.host.email,
        roomID: roomData._id,
        title: roomData.title,
        image: roomData.image,
        location: roomData.location,
        from: value.startDate,
        to: value.endDate,
        price: totalPrice
    };
    
    const handleSelect = () => {
        setValue({...value});
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>$ {roomData.price}</div>
                <div className='font-light text-neutral-600'>night</div>
            </div>
            <hr />
            <Calender value={value} handleSelect={handleSelect} />
            <hr />
            <div className='p-4'>
                <Button onClick={() => setIsOpen(true)} disabled={roomData.host.email === user.email || roomData.booked} label='Reserve' />
            </div>
            <hr />
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>
            <BookingModal 
                closeModal={closeModal} 
                isOpen={isOpen} 
                bookingInfo={bookingInfo} 
            />
        </div>
    );
};

export default RoomReservation;