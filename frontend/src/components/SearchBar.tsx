import styles from "./SearchBar.module.css";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { CiFlag1 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <div className={styles.labelContainer}>
            <label htmlFor="destination" className={styles.label}>
              Destination
            </label>
          </div>
          <div className={styles.inputContainer}>
            <i className={styles.inputIcon}>
              <IoPaperPlaneOutline />
            </i>
            <input
              type="text"
              id="destination"
              placeholder="Where to go?"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelContainer}>
            <label htmlFor="type" className={styles.label}>
              Type
            </label>
          </div>
          <div className={styles.inputContainer}>
            <i className={styles.inputIcon}>
              <CiFlag1 />
            </i>
            <input
              type="text"
              id="type"
              placeholder="Activity"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelContainer}>
            <label htmlFor="when" className={styles.label}>
              When
            </label>
          </div>
          <div className={styles.inputContainer}>
            <i className={styles.inputIcon}>
              <CiCalendar />
            </i>
            <input
              type="text"
              id="when"
              placeholder="Date"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelContainer}>
            <label htmlFor="guests" className={styles.label}>
              Guests
            </label>
          </div>
          <div className={styles.inputContainer}>
            <i className={styles.inputIcon}>
              <FiUsers />
            </i>
            <input
              type="number"
              id="guests"
              className={styles.input}
              placeholder="0"
            />
          </div>
        </div>
        <div className={styles.divButton}>
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
