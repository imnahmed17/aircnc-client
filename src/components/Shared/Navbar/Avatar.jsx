import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import avatarImg from '../../../assets/images/placeholder.jpg';

const Avatar = () => {
    const { user } = useContext(AuthContext);

    return (
        <img
            className='rounded-full'
            referrerPolicy='no-referrer'
            src={user && user.photoURL ? user.photoURL : avatarImg}
            alt='profile'
            height='30'
            width='30'
        />
    );
};

export default Avatar;