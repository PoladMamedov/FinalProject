import './style.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__title-wrapper">
          <p className="footer__title">Innovation Oasis</p>
          <p className="footer__subtitle">©Copyright 2023. Created by OurTeam</p>
        </div>
        <div className="footer__social-icons">
          <a href="facebook.com" className="social-icons__item social-icons__item--facebook"><img src="/img/footer-facebook-logo.png" alt="facebook-link" width={30} /></a>
          <a href="twitter.com" className="social-icons__item social-icons__item--twitter"><img src="/img/footer-twitter-logo.png" alt="twitter-link" width={30} /></a>
          <a href="instagram.com" className="social-icons__item social-icons__item--instagram"><img src="/img/footer-instagram-logo.png" alt="instagram-link" width={30} /></a>
          <a href="youtube.com" className="social-icons__item social-icons__item--youtube"><img src="/img/footer-youtube-logo.png" alt="youtube-link" width={30} /></a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
