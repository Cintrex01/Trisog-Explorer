import { useParams } from "react-router-dom";
import styles from "./TourDetails.module.css";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TourProps } from "./Tour";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoDeviceCameraVideo } from "react-icons/go";
import { MdOutlinePhoto } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Map from "../components/Map";

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
        <div className={styles.containerLeft}>
          <div className={styles.imageContainer}>
            <img src={tour.image} alt={tour.place} />
            <div className={styles.textOverlay}>
              <div className={styles.textIconOverlay}>
                <span className={styles.videoText}>Video</span>
                <i>
                  <GoDeviceCameraVideo />
                </i>
              </div>
              <div className={styles.textIconOverlay}>
                <span className={styles.galleryText}>Gallery</span>
                <i>
                  <MdOutlinePhoto />
                </i>
              </div>
            </div>
          </div>
          <div className={styles.imageSubtitle}>
            <div className={styles.imageSubtitleLeft}>
              <i>
                <CiLocationOn />
              </i>
              <p>{tour.place}</p>
              <span>View on map</span>
            </div>
            <div className={styles.imageSubtitleRight}>
              <i>
                <CiShare2 />
              </i>
              <i>
                <CiHeart />
              </i>
            </div>
          </div>
          <div className={styles.tourTitle}>
            <h2>{tour.title}</h2>
          </div>
          <div className={styles.tourInfo}>
            <div className={styles.tourInfoDetail}>
              <p>From</p>
              <span>{`$${tour.price}`}</span>
            </div>
            <div className={styles.tourInfoDetail}>
              <p>Duration</p>
              <h6>{`${tour.duration} days`}</h6>
            </div>
            <div className={styles.tourInfoDetail}>
              <p>Max People</p>
              <h6>{tour.maxPeople}</h6>
            </div>
            <div className={styles.tourInfoDetail}>
              <p>Min Age</p>
              <h6>{`${tour.minAge}+`}</h6>
            </div>
            <div className={styles.tourInfoDetail}>
              <p>Tour Type</p>
              <h6>{tour.type}</h6>
            </div>
            <div className={styles.tourInfoDetail}>
              <p>Reviews</p>
              <div>
                <span>
                  <FaStar />
                </span>
                <h6>{tour.grade}</h6>
                <p>{`(${tour.reviewNumber} reviews)`}</p>
              </div>
            </div>
          </div>
          <div className={styles.tourOverview}>
            <h2>Overview</h2>
            <p>{tour.description}</p>
          </div>
          <div className={styles.map}>
            <h2>Map</h2>
            <Map key={id} city={tour.place} />
          </div>
        </div>
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
      <Footer />
    </>
  );
};

export default TourDetails;
