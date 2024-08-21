import { useState } from 'react';
import styles from './Footer.module.css'
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";

const Footer = () => {

    const [email,setEmail] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleSubmit = () => {

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
          } else {
            setErrorMessage('');
        }
    }

  return (
    <footer className={styles.container}>
        <div className={styles.box}>
            <div className={styles.info}>
                <div className={styles.logo}>
                <i><BiSolidPlaneAlt /></i>
                <h2>Trisog</h2>
                </div>
                <div className={styles.numberLocationEmail}>
                    <p className={styles.help}>Need any help?</p>
                    <p className={styles.callUs}>Call Us: <span className={styles.phoneNumber}>(888)1234 5678</span></p>
                    <p className={styles.textInfo1}>Love Street, Muscat, Oman</p>
                    <p className={styles.textInfo2}>exaample@trisog.com</p>
                </div>
                <div className={styles.socialMedia}>
                    <a href="https://facebook.com" target="_blank" className={styles.a}><FaFacebookSquare /></a>
                    <a href="https://x.com/" target="_blank" className={styles.a}><FaTwitter/></a>
                    <a href="https://www.linkedin.com/" target="_blank" className={styles.a}><FaLinkedinIn/></a>
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.list1}>
                <ul>
                    <li className={styles.liHeader}>Company</li>
                    <li className={styles.li}>About Us</li>
                    <li className={styles.li}>Contact Us</li>
                    <li className={styles.li}>Travel Guides</li>
                    <li className={styles.li}>Data Policy</li>
                </ul>
                </div>
                <div className={styles.list2}>
                <ul>
                    <li className={styles.liHeader}>Top Destination</li>
                    <li className={styles.li}>Las vegas</li>
                    <li className={styles.li}>New York City</li>
                    <li className={styles.li}>San Francisco</li>
                    <li className={styles.li}>Hawaii</li>
                </ul>
                </div>
                <div className={styles.list3}>
                <ul>
                    <li className={styles.liHeader}>Top Destination</li>
                    <li className={styles.li}>Tokyo</li>
                    <li className={styles.li}>Sydney</li>
                    <li className={styles.li}>Melbourne</li>
                    <li className={styles.li}>Dubai</li>
                </ul>
                </div>
            </div>
            <div className={styles.contact}>
                <label className={styles.label} htmlFor="email">Sign up Newsletter</label>
                <div className={styles.inputContainer}>
                    <i className={styles.inputIcon}><IoPaperPlaneOutline /></i>
                    <input className={styles.input} type="email" id="email" placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)}/>
                </div>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <button onClick={handleSubmit}>Submit</button>
                <p className={styles.rights}>© 2023 Trisog All Right Reserved</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer