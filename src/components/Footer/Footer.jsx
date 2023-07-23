import { Image } from "cloudinary-react";
import cloudinaryConfig from "../../config/cloudinaryConfig";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__title-wrapper">
          <p className="footer__title">Innovation Oasis</p>
          <p className="footer__subtitle">©Copyright 2023. Created by OurTeam</p>
        </div>
        <div className="footer__social-icons">
          <a href="facebook.com" className="social-icons__item social-icons__item--facebook"> <Image cloudName={cloudinaryConfig.cloudName} publicId="footer-facebook-logo_hqjcwr" alt="facebook-link" width={30} /> </a>
          <a href="twitter.com" className="social-icons__item social-icons__item--twitter"><Image cloudName={cloudinaryConfig.cloudName} publicId="footer-twitter-logo_xxsnnw" alt="twitter-link" width={30} /></a>
          <a href="instagram.com" className="social-icons__item social-icons__item--instagram"><Image cloudName={cloudinaryConfig.cloudName} publicId="https://res.cloudinary.com/dfinki0p4/image/upload/v1689604281/footer-icons/footer-instagram-logo_kwlsmr.png" alt="instagram-link" width={30} /></a>
          <a href="youtube.com" className="social-icons__item social-icons__item--youtube"><Image cloudName={cloudinaryConfig.cloudName} publicId="footer-youtube-logo_lgsgph" alt="youtube-link" width={30} /></a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
