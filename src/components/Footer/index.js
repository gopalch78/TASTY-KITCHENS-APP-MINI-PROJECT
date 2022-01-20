import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-bg-container">
      <div className="image-heading-container">
        <img
          src="https://res.cloudinary.com/dybwc1zda/image/upload/v1638694576/Vectorfooter-logo_vkeqke.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="tasty-heading">Tasty Kitchen</h1>
      </div>
      <p className="footer-paragraph">
        The only thing we are serious about is food.
        <br /> Contact us on
      </p>

      <ul className="footer-ul-container">
        <li className="footer-list-item">
          <a href="https://in.pinterest.com/" target="_blank" rel="noreferrer">
            <FaPinterestSquare
              testid="pintrest-social-icon"
              className="icon-2"
            />
          </a>
        </li>

        <li className="footer-list-item">
          <a
            href="https://www.instagram.com/?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram testid="instagram-social-icon" className="icon-2" />
          </a>
        </li>
        <li className="footer-list-item">
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <FaTwitter testid="twitter-social-icon" className="icon-2" />
          </a>
        </li>
        <li className="footer-list-item">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <FaFacebookSquare
              testid="facebook-social-icon"
              className="icon-2"
            />
          </a>
        </li>
      </ul>
    </div>
  )
}
