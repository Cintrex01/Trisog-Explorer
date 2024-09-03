import styles from "./Header.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { doSignOut } from "../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [user] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (onSearch) {
      onSearch(newSearchTerm);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerContact}>
        <div className={styles.numberEmail}>
          <p className={styles.number}>(000)999-898-999</p>
          <p className={styles.email}>info@trisog.com</p>
        </div>
        <div className={styles.socialMedia}>
          <a href="https://x.com/" target="_blank" className={styles.a}>
            <FaTwitter className={styles.icon} />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            className={styles.a}
          >
            <FaLinkedinIn className={styles.icon} />
          </a>
          <a
            href="https://www.google.com/"
            target="_blank"
            className={styles.a}
          >
            <FaGoogle className={styles.icon} />
          </a>
          <a
            href="https://br.pinterest.com/"
            target="_blank"
            className={styles.a}
          >
            <FaPinterestP className={styles.icon} />
          </a>
          <p className={styles.lang}>EUR</p>
          <i className={styles.arrowDown}>
            <IoIosArrowDown />
          </i>
        </div>
      </div>
      <nav className={styles.containerOptions}>
        <div className={styles.logo}>
          <i>
            <BiSolidPlaneAlt />
          </i>
          <h2>Trisog</h2>
        </div>
        <div className={styles.links}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? `${styles.customButton} ${styles.activeLink}`
                : styles.customButton
            }
            style={{ textDecoration: "none" }}
          >
            <span className={styles.clickableText}>Home</span>
          </NavLink>
          <button className={styles.customButton}>
            <span className={styles.clickableText}>About</span>
          </button>
          <NavLink
            to="/tour"
            className={({ isActive }) =>
              isActive
                ? `${styles.customButton} ${styles.activeLink}`
                : styles.customButton
            }
            style={{ textDecoration: "none" }}
          >
            <span className={styles.clickableText}>Tours</span>
          </NavLink>
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
          <div className={styles.searchInput}>
            <input
              type="text"
              placeholder="Type anything..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <i className={styles.searchIcon}>
              <FaSearch />
            </i>
          </div>

          <i className={styles.loginIcon}>
            {user ? (
              <p className={styles.clickableTextLogin}>
                {user.email}{" "}
                <i>
                  <FaRegUser />
                </i>
              </p>
            ) : (
              <FaRegUser />
            )}
          </i>
          <button
            className={styles.customButtonLogin}
            onClick={() => {
              doSignOut().then(() => (window.location.href = "/"));
            }}
          >
            <span className={styles.clickableTextLogin}>
              {user ? (
                <p>
                  <span className={styles.logout}>
                    Logout{" "}
                    <i>
                      <IoIosLogOut />
                    </i>
                  </span>
                </p>
              ) : (
                <p>Login / Signup</p>
              )}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
