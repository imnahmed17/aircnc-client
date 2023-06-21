import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { imageUpload } from "../../api/imageUpload";
import { addRoom } from "../../api/rooms";
import { AuthContext } from "../../providers/AuthProvider";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import toast from "react-hot-toast";

const AddRoom = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const navigate = useNavigate();

    const formatDate = date => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);

        const form = event.target;
        const location = form.location.value;
        const title = form.title.value;
        const category = form.category.value;
        const image = form.image.files[0];
        const from = dates.startDate;
        const to = dates.endDate;
        const price = form.price.value;
        const total_guest = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        setUploadButtonText('Uploading...');

        imageUpload(image)
            .then(data => {
                const roomData = { 
                    host: { 
                        email: user?.email,
                        name: user?.displayName,
                        image: user?.photoURL
                    },
                    location, 
                    title, 
                    category,
                    image: data.data.display_url, 
                    dateRange: `${formatDate(from)} - ${formatDate(to)}`,
                    price: parseFloat(price),
                    total_guest,
                    bedrooms,
                    bathrooms,
                    description
                };
                console.log(roomData);

                addRoom(roomData)
                    .then(() => {
                        toast.success("Room Added!");
                        setUploadButtonText('Uploaded!');
                        setLoading(false);
                        form.reset();
                        navigate('/dashboard/my-listings');
                    });
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const handleImageChange = image => {
        setUploadButtonText(image.name);
    };

    const handleDates = ranges => {
        setDates(ranges.selection);
    };

    return (
        <>
            <Helmet>
                <title>Add Room - AirCNC</title>
            </Helmet>
            <AddRoomForm 
                handleSubmit={handleSubmit} 
                dates={dates}
                handleDates={handleDates}
                loading={loading} 
                handleImageChange={handleImageChange} 
                uploadButtonText={uploadButtonText} 
            />
        </>
    );
};

export default AddRoom;