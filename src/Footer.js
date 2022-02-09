import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
const Footer = () => {
    return (
        <div className="footer">
             <div className='FooterIcon'>
        <FaInstagram className='footerIcon'/>
        <FaFacebook className='footerIcon'/>
        <FaTwitter className='footerIcon'/>
    </div>
    <div className='FooterText'>
      <p>&copy; 2022 Robert Oluwaseun</p>
    </div>
        </div>
    )
}

export default Footer;
