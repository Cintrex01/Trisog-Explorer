import styles from "./TourCard.module.css";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const TourCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1j24FzG-3_rUXMeFsYvO8YSHv6jpl9aRmnw&s"
          alt="Mountain"
        />
        <div className={styles.heartContainer}>
          <i className={styles.heart}>
            <CiHeart />
          </i>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.textContainer}>
          <p className={styles.location}>Budapest, Hungary</p>
          <p className={styles.tour}>Wonders of the West Coast & Kimberley</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.starReviewDays}>
            <div className={styles.starContainer}>
              <i className={styles.star}>
                <FaStar />
              </i>
              <p className={styles.starNumber}>4.8</p>
            </div>
            <div className={styles.reviewDays}>
              <div className={styles.reviewContainer}>
                <p className={styles.review}>15 reviews</p>
              </div>
              <div className={styles.daysContainer}>
                <i className={styles.clock}>
                  <FaRegClock />
                </i>
                <p className={styles.days}>7days</p>
              </div>
            </div>
          </div>
          <div className={styles.priceContainer}>
            <p className={styles.startingFrom}>Starting From</p>
            <p className={styles.price}>$520</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
