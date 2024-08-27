import styles from "./TourCard.module.css";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

interface TourCardProps {
  image: string;
  location: string;
  title: string;
  grade: number;
  reviews: number;
  duration: number;
  price: number;
}

const TourCard: React.FC<TourCardProps> = ({
  image,
  location,
  title,
  grade,
  reviews,
  duration,
  price,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt={title} />
        <div className={styles.heartContainer}>
          <i className={styles.heart}>
            <CiHeart />
          </i>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.textContainer}>
          <p className={styles.location}>{location}</p>
          <p className={styles.tour}>{title}</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.starReviewDays}>
            <div className={styles.starContainer}>
              <i className={styles.star}>
                <FaStar />
              </i>
              <p className={styles.starNumber}>{grade}</p>
            </div>
            <div className={styles.reviewDays}>
              <div className={styles.reviewContainer}>
                <p className={styles.review}>{reviews} reviews</p>
              </div>
              <div className={styles.daysContainer}>
                <i className={styles.clock}>
                  <FaRegClock />
                </i>
                <p className={styles.days}>{duration} days</p>
              </div>
            </div>
          </div>
          <div className={styles.priceContainer}>
            <p className={styles.startingFrom}>Starting From</p>
            <p className={styles.price}>${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
