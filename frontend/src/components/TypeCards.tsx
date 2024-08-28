import styles from "./TypeCards.module.css";
import { MdAirplaneTicket } from "react-icons/md";

interface CategoryData {
  type: string;
  tourCount: number;
  minPrice: number;
}

const TypeCards: React.FC<{ categoryData: CategoryData }> = ({
  categoryData,
}) => {
  return (
    <div className={styles.typeContainer}>
      <i className={styles.typeIcon}>
        <MdAirplaneTicket />
      </i>
      <h3>{categoryData.type}</h3>
      <p>
        <span>{categoryData.tourCount}</span> Tours
      </p>
      <p>
        From <span className={styles.price}>${categoryData.minPrice}</span>
      </p>
    </div>
  );
};

export default TypeCards;
