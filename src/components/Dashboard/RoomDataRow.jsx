import { useState } from "react";
import { format } from "date-fns";
import { deleteRoom } from "../../api/rooms";
import toast from "react-hot-toast";
import DeleteModal from "../Modal/DeleteModal";
import UpdateRoomModal from "../Modal/UpdateRoomModal";

const RoomDataRow = ({ room, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const modalHandler = id => {
        deleteRoom(id)
            .then(() => {
                refetch();
                toast.success("Room Deleted");
            });

        setIsOpen(false);
    };

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="block relative">
                            <img alt="profile" src={room?.image} className="mx-auto object-cover rounded h-10 w-16" />
                        </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"> 
                <p className="text-gray-900 whitespace-no-wrap">{format(new Date(room?.dateRange.split(" - ")[0]), "P")}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{format(new Date(room?.dateRange.split(" - ")[1]), "P")}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span onClick={() => setIsOpen(true)} className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden="true" className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">Delete</span>
                </span>
                <DeleteModal 
                    modalHandler={modalHandler} 
                    closeModal={() => setIsOpen(false)} 
                    isOpen={isOpen} 
                    id={room._id}
                />
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span onClick={() => setIsEditModalOpen(true)} className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">Update</span>
                </span>
                <UpdateRoomModal
                    setIsEditModalOpen={setIsEditModalOpen}
                    isOpen={isEditModalOpen}
                    refetch={refetch}
                    // closeModal={() => setIsEditModalOpen(false)}
                    room={room}
                    id={room._id}
                />
            </td>
        </tr>
    );
};

export default RoomDataRow;