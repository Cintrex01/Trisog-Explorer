import { useParams } from "react-router-dom";
import styles from "./TourDetails.module.css";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TourProps } from "./Tour";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TourDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<TourProps | null>(null);
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchTour() {
      try {
        const response = await api.get(`/tours/${id}`);
        setTour(response.data.data);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    }

    fetchTour();
  }, [id]);

  useEffect(() => {
    if (tour) {
      const total = (adults + kids + children) * tour.price;
      setTotalPrice(total);
    }
  }, [adults, kids, children, tour]);

  const handleTicketChange = (category: string, change: number) => {
    if (category === "adults") {
      setAdults((prev) => Math.max(0, prev + change));
    } else if (category === "kids") {
      setKids((prev) => Math.max(0, prev + change));
    } else if (category === "children") {
      setChildren((prev) => Math.max(0, prev + change));
    }
  };

  if (!tour) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className={styles.containerMain}>
        <div className={styles.containerLeft}></div>
        <div className={styles.containerRight}>
          <div className={styles.priceBox}>
            <div className={styles.perPerson}>
              <p>
                <span>${`${tour.price}`}</span> / per person
              </p>
            </div>
            <div className={styles.dateTimeSection}>
              <label htmlFor="">Date</label>
              <input type="date" />
            </div>
            <div className={styles.dateTimeSection}>
              <label htmlFor="">Time</label>
              <select id="select" name="select" form="cselect">
                <option value="select">Select</option>
                <option value="days">{`${tour.duration} Days`}</option>
              </select>
            </div>
            <div className={styles.ticketSection}>
              <div className={styles.ticketLabel}>
                <p>Ticket</p>
              </div>
              <div className={styles.ticketTier}>
                <p>Adults (18+ years)</p>
                <div className={styles.priceButtons}>
                  <button onClick={() => handleTicketChange("adults", -1)}>
                    -
                  </button>
                  <button className={styles.priceDisplay}>{adults}</button>
                  <button onClick={() => handleTicketChange("adults", 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className={styles.ticketTier}>
                <p>Kids (12+ years)</p>
                <div className={styles.priceButtons}>
                  <button onClick={() => handleTicketChange("kids", -1)}>
                    -
                  </button>
                  <button className={styles.priceDisplay}>{kids}</button>
                  <button onClick={() => handleTicketChange("kids", 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className={styles.ticketTier}>
                <p>Children (3+ years)</p>
                <div className={styles.priceButtons}>
                  <button onClick={() => handleTicketChange("children", -1)}>
                    -
                  </button>
                  <button className={styles.priceDisplay}>{children}</button>
                  <button onClick={() => handleTicketChange("children", 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.totalSection}>
              <div className={styles.totalPrice}>
                <p>Total</p>
                <span>{`$${totalPrice}`}</span>
              </div>
              <div className={styles.bookNow}>
                <button>Book now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>{tour.title}</h1>
        <img src={tour.image} alt={tour.title} />
        <p>{tour.description}</p>
        {/* Exibir mais detalhes do tour */}
      </div>
      <Footer />
    </>
  );
};

export default TourDetails;
