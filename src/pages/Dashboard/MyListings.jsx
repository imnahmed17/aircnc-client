import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RoomDataRow from "../../components/Dashboard/RoomDataRow";
import EmptyState from "../../components/Shared/EmptyState";

const MyListings = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: rooms = [], refetch } = useQuery({
        queryKey: ['rooms', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`${import.meta.env.VITE_API_URL}/rooms/${user?.email}`);
            return res.data;
        }
    });

    return (
        <>
            <Helmet>
                <title>My Listings - AirCNC</title>
            </Helmet>
            {
                rooms && Array.isArray(rooms) && rooms.length > 0 ? (
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="py-8">
                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Location
                                                </th>
                                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    From
                                                </th>
                                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    To
                                                </th>
                                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Delete
                                                </th>
                                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                    Update
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                rooms && rooms.map(room => <RoomDataRow 
                                                    key={room?._id} 
                                                    room={room} 
                                                    refetch={refetch}
                                                />)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <EmptyState
                        message='No Room data available.'
                        address='/dashboard/add-room'
                        label='Add Rooms'
                    />
                )
            }
        </>
    );
};

export default MyListings;