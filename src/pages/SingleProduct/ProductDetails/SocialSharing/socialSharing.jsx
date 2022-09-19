import './socialSharing.scss';
import { BsPinterest } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';

export const SocialSharing = () => {
    return (
        <div className="social-sharing">
            <span ><BsPinterest /></span>
            <span href=""><BsFacebook /></span>
            <span href=""><BsTwitter /></span>
            <span href=""><BsYoutube /></span>
        </div>
    )
}