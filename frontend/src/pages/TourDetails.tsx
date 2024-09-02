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
import { FaUserAlt } from "react-icons/fa";

const TourDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<TourProps | null>(null);
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    comment: "",
    servicesGrade: 0,
    locationsGrade: 0,
    amenitiesGrade: 0,
    pricesGrade: 0,
    roomGrade: 0,
  });

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

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post(`/tours/${id}/reviews`, reviewData);
      setTour(response.data.data);
      setReviewData({
        name: "",
        email: "",
        comment: "",
        servicesGrade: 0,
        locationsGrade: 0,
        amenitiesGrade: 0,
        pricesGrade: 0,
        roomGrade: 0,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
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
          <h2 className={styles.averageReviewsTitle}>Average Reviews</h2>
          <div className={styles.averageReviews}>
            <div className={styles.averageReviewsBox}>
              <div className={styles.averageReviewsSquare}>
                <h2>{tour.grade}</h2>
                <p>
                  <i>
                    <FaStar />
                  </i>
                  Excellent
                </p>
              </div>
              <div className={styles.averageReviewsNumbers}>
                <div className={styles.averageReviewsNumbersColumn}>
                  <div className={styles.reviewCategory}>
                    <p>Services</p>
                    <div>
                      <div>
                        <div className={styles.bar1}></div>
                        <div className={styles.bar2}></div>
                        <div className={styles.bar3}></div>
                        <div className={styles.bar4}></div>
                        <div className={styles.bar5}></div>
                      </div>
                      {tour.reviews.length > 0 ? (
                        (() => {
                          const totalServicesGrade = tour.reviews.reduce(
                            (acc, review) => acc + review.servicesGrade,
                            0
                          );
                          const averageServicesGrade = Math.ceil(
                            totalServicesGrade / tour.reviews.length
                          );
                          return <p>{averageServicesGrade}</p>;
                        })()
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.reviewCategory}>
                    <p>Locations</p>
                    <div>
                      <div>
                        <div className={styles.bar1}></div>
                        <div className={styles.bar2}></div>
                        <div className={styles.bar3}></div>
                        <div className={styles.bar4}></div>
                        <div className={styles.bar5}></div>
                      </div>
                      {tour.reviews.length > 0 ? (
                        (() => {
                          const totalLocationsGrade = tour.reviews.reduce(
                            (acc, review) => acc + review.locationsGrade,
                            0
                          );
                          const averageLocationsGrade = Math.ceil(
                            totalLocationsGrade / tour.reviews.length
                          );
                          return <p>{averageLocationsGrade}</p>;
                        })()
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.reviewCategory}>
                    <p>Amenities</p>
                    <div>
                      <div>
                        <div className={styles.bar1}></div>
                        <div className={styles.bar2}></div>
                        <div className={styles.bar3}></div>
                        <div className={styles.bar4}></div>
                        <div className={styles.bar5}></div>
                      </div>
                      {tour.reviews.length > 0 ? (
                        (() => {
                          const totalAmenitiesGrade = tour.reviews.reduce(
                            (acc, review) => acc + review.amenitiesGrade,
                            0
                          );
                          const averageAmenitiesGrade = Math.ceil(
                            totalAmenitiesGrade / tour.reviews.length
                          );
                          return <p>{averageAmenitiesGrade}</p>;
                        })()
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.averageReviewsNumbersColumn}>
                  <div className={styles.reviewCategory}>
                    <p>Prices</p>
                    <div>
                      <div>
                        <div className={styles.bar1}></div>
                        <div className={styles.bar2}></div>
                        <div className={styles.bar3}></div>
                        <div className={styles.bar4}></div>
                        <div className={styles.bar5}></div>
                      </div>
                      {tour.reviews.length > 0 ? (
                        (() => {
                          const totalPriceGrade = tour.reviews.reduce(
                            (acc, review) => acc + review.pricesGrade,
                            0
                          );
                          const averagePriceGrade = Math.ceil(
                            totalPriceGrade / tour.reviews.length
                          );
                          return <p>{averagePriceGrade}</p>;
                        })()
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.reviewCategory}>
                    <p>Room comfort</p>
                    <div>
                      <div>
                        <div className={styles.bar1}></div>
                        <div className={styles.bar2}></div>
                        <div className={styles.bar3}></div>
                        <div className={styles.bar4}></div>
                        <div className={styles.bar5}></div>
                      </div>
                      {tour.reviews.length > 0 ? (
                        (() => {
                          const totalRoomGrade = tour.reviews.reduce(
                            (acc, review) => acc + review.roomGrade,
                            0
                          );
                          const averageRoomGrade = Math.ceil(
                            totalRoomGrade / tour.reviews.length
                          );
                          return <p>{averageRoomGrade}</p>;
                        })()
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Seções de reviews */}
          <div className={styles.showReview}>
            <h2>Reviews</h2>
            {tour.reviews.length > 0 ? (
              tour.reviews.map((review, index) => (
                <div className={styles.review} key={index}>
                  <div className={styles.reviewPhoto}>
                    <div>
                      <i>
                        <FaUserAlt />
                      </i>
                    </div>
                  </div>
                  <div className={styles.reviewInfo}>
                    <p className={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                    <h2>{review.name}</h2>
                    <div className={styles.gradeReviewNumber}>
                      <div>
                        <i>
                          <FaStar />
                        </i>
                        {review.totalGrade}
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
          <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
            <div className={styles.addReview}>
              <h2>Add a review</h2>
              <div className={styles.reviewRow}>
                <div className={styles.reviewColumn}>
                  <p>Services</p>
                  <div className={styles.stars}>
                    <input
                      type="number"
                      name="servicesGrade"
                      placeholder="Services Grade"
                      min="1"
                      max="5"
                      value={reviewData.servicesGrade}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.reviewColumn}>
                  <p>Locations</p>
                  <div className={styles.stars}>
                    <input
                      type="number"
                      name="locationsGrade"
                      placeholder="Locations Grade"
                      min="1"
                      max="5"
                      value={reviewData.locationsGrade}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.reviewColumn}>
                  <p>Amenities</p>
                  <div className={styles.stars}>
                    <input
                      type="number"
                      name="amenitiesGrade"
                      placeholder="Amenities Grade"
                      min="1"
                      max="5"
                      value={reviewData.amenitiesGrade}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.reviewColumn}>
                  <p>Prices</p>
                  <div className={styles.stars}>
                    <input
                      type="number"
                      name="pricesGrade"
                      placeholder="Prices Grade"
                      min="1"
                      max="5"
                      value={reviewData.pricesGrade}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.reviewColumn}>
                  <p>Room confort</p>
                  <div className={styles.stars}>
                    <input
                      type="number"
                      name="roomGrade"
                      placeholder="Room Grade"
                      min="1"
                      max="5"
                      value={reviewData.roomGrade}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formReview}>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={reviewData.name}
                    onChange={handleReviewChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={reviewData.email}
                    onChange={handleReviewChange}
                    required
                  />
                </div>
                <div className={styles.reviewComment}>
                  <textarea
                    name="comment"
                    placeholder="Your Comment"
                    value={reviewData.comment}
                    onChange={handleReviewChange}
                    required
                  />
                </div>
                <div className={styles.reviewButton}>
                  <button type="submit">Submit review</button>
                </div>
              </div>
            </div>
          </form>
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
