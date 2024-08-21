import styles from './Header.module.css'
import { IoIosArrowDown } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";


const Header = () => {
  return (
    <div className={styles.container}>
        <div className={styles.containerContact}>
            <div className={styles.numberEmail}>
                <p className={styles.number}>(000)999-898-999</p>
                <p className={styles.email}>info@trisog.com</p>
            </div>
            <div className={styles.socialMedia}>
                <a href="https://x.com/" target="_blank" className={styles.a}><FaTwitter className={styles.icon}/></a>
                <a href="https://www.linkedin.com/" target="_blank" className={styles.a}><FaLinkedinIn className={styles.icon}/></a>
                <a href="https://www.google.com/" target="_blank" className={styles.a}><FaGoogle className={styles.icon}/></a>
                <a href="https://br.pinterest.com/" target="_blank" className={styles.a}><FaPinterestP className={styles.icon}/></a>
                <p className={styles.lang}>EUR</p>
                <i className={styles.arrowDown}><IoIosArrowDown /></i>
            </div>
            
        </div>
        <nav className={styles.containerOptions}>
            <div className={styles.logo}>
                <i><BiSolidPlaneAlt /></i>
                <h2>Trisog</h2>
            </div>
            <div className={styles.links}>
                <button className={styles.customButton}>
                    <span className={styles.clickableText}>Home</span>
                </button>
                <button className={styles.customButton}>
                    <span className={styles.clickableText}>About</span>
                </button>
                <button className={styles.customButton}>
                    <span className={styles.clickableText}>Tours</span>
                </button>
                <button className={styles.customButton}>
                    <span className={styles.clickableText}>Destination</span>
                </button>
                <button className={styles.customButton}>
                    <span className={styles.clickableText}>Blog</span>
                </button>
                <button className={styles.customButton}>
                    <span className={styles.clickableText}>Pages</span>
                </button>
                <button className={styles.customButton}>
                    <span className={styles.clickableText}>Contact</span>
                </button>
            </div>
            <div className={styles.login}>
                <i className={styles.loginIcon}><FaSearch /></i>
                <i className={styles.loginIcon}><FaRegUser /></i>
                <button className={styles.customButtonLogin}>
                    <span className={styles.clickableTextLogin}>Login / Signup</span>
                </button>
            </div>
        </nav>
        
    </div>
  )
}

export default Header