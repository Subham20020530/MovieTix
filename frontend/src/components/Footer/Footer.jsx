import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Welcome to MovieTix, your one-stop
            destination for booking movie tickets effortlessly. Enjoy a seamless
            and quick booking experience.
          </p>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://x.com/SubhamKundu123">
              <FontAwesomeIcon icon={faSquareXTwitter} />
            </a>
            <a href="https://www.instagram.com/s.u.b.h.a.m_13">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com/in/subham123/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/Subham20020530">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2024 MovieTix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
