import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { imageUpload } from '../../api/imageUpload';
import { updateRoom } from '../../api/rooms';
import toast from 'react-hot-toast';
import UpdateRoomForm from '../Forms/UpdateRoomForm';

const UpdateRoomModal = ({ setIsEditModalOpen, isOpen, refetch, room, id }) => {
    const [roomData, setRoomData] = useState(room);
    const [loading, setLoading] = useState(false);
    const [dates, setDates] = useState({
        startDate: new Date(room.dateRange.split(" - ")[0]),
        endDate: new Date(room.dateRange.split(" - ")[1]),
        key: 'selection'
    });

    const formatDate = date => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    const handleImageUpdate = image => {
        setLoading(true);

        imageUpload(image)
            .then(res => {
                setRoomData({ ...roomData, image: res.data.display_url });
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleSubmit = event => {
        event.preventDefault();

        const updatedData = Object.assign({}, { ...roomData });
        delete updatedData._id;
        setLoading(true);

        updateRoom(updatedData, id)
            .then(() => {
                toast.success('Home info updated');
                setLoading(false);
                refetch();
                setIsEditModalOpen(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleDates = ranges => {
        setDates(ranges.selection);
        setRoomData({
            ...roomData,
            dateRange: `${formatDate(ranges.selection.startDate)} - ${formatDate(ranges.selection.endDate)}`
        });
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={() => setIsEditModalOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>
                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title as='h3' className='text-lg font-medium text-center leading-6 text-gray-900'>
                                    Update Room Info
                                </Dialog.Title>
                                <div className='mt-2 w-full'>
                                    <UpdateRoomForm
                                        handleSubmit={handleSubmit}
                                        dates={dates}
                                        handleDates={handleDates}
                                        loading={loading}
                                        handleImageUpdate={handleImageUpdate}
                                        roomData={roomData}
                                        setRoomData={setRoomData}
                                    />
                                </div>
                                <hr className='mt-8 ' />
                                <div className='mt-2 '>
                                    <button onClick={() => setIsEditModalOpen(false)} type='button' className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'>
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateRoomModal;