import { Link, useParams } from "react-router-dom";
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
import { Slide, Slider, SliderProps } from "../components/Slider";
import TourCard from "../components/TourCard";

const TourDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<TourProps | null>(null);
  const [tours, setTours] = useState<TourProps[]>([]);
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

  const settingsTour: SliderProps = {
    autoplay: {
      delay: 4000,
    },
    spaceBetween: 50,
    slidesPerView: 4,
    /* navigation: true, */
    pagination: {
      clickable: true,
    },
  };

  useEffect(() => {
    async function fetchTour() {
      try {
        const response = await api.get(`/tours/${id}`);
        setTour(response.data.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    }

    fetchTour();
  }, [id]);

  useEffect(() => {
    loadTours();
  }, []);

  useEffect(() => {
    if (tour) {
      const total = (adults + kids + children) * tour.price;
      setTotalPrice(total);
    }
  }, [adults, kids, children, tour]);

  async function loadTours() {
    try {
      const response = await api.get("/tours");
      setTours(response.data.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  }

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

  const averageServicesGrade = tour?.reviews.length
    ? Math.ceil(
        tour.reviews.reduce((acc, review) => acc + review.servicesGrade, 0) /
          tour.reviews.length
      )
    : 0;

  const averageLocationsGrade = tour?.reviews.length
    ? Math.ceil(
        tour.reviews.reduce((acc, review) => acc + review.locationsGrade, 0) /
          tour.reviews.length
      )
    : 0;

  const averageAmenitiesGrade = tour?.reviews.length
    ? Math.ceil(
        tour.reviews.reduce((acc, review) => acc + review.amenitiesGrade, 0) /
          tour.reviews.length
      )
    : 0;

  const averagePriceGrade = tour?.reviews.length
    ? Math.ceil(
        tour.reviews.reduce((acc, review) => acc + review.pricesGrade, 0) /
          tour.reviews.length
      )
    : 0;

  const averageRoomGrade = tour?.reviews.length
    ? Math.ceil(
        tour.reviews.reduce((acc, review) => acc + review.roomGrade, 0) /
          tour.reviews.length
      )
    : 0;

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
                  {tour.grade === 5 && "Excellent"}
                  {tour.grade === 4 && "Very Good"}
                  {tour.grade === 3 && "Good"}
                  {tour.grade === 2 && "Bad"}
                  {tour.grade === 1 && "Very Bad"}
                </p>
              </div>
              <div className={styles.averageReviewsNumbers}>
                <div className={styles.averageReviewsNumbersColumn}>
                  <div className={styles.reviewCategory}>
                    <p>Services</p>
                    <div>
                      <div className={styles.backgroundReview}>
                        {Array.from({ length: averageServicesGrade }).map(
                          (_, index) => (
                            <div
                              className={styles[`bar${index + 1}`]}
                              key={index}
                            ></div>
                          )
                        )}
                      </div>
                      <div>
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
                  </div>
                  <div className={styles.reviewCategory}>
                    <p>Locations</p>
                    <div>
                      <div>
                        {Array.from({ length: averageLocationsGrade }).map(
                          (_, index) => (
                            <div
                              className={styles[`bar${index + 1}`]}
                              key={index}
                            ></div>
                          )
                        )}
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
                        {Array.from({ length: averageAmenitiesGrade }).map(
                          (_, index) => (
                            <div
                              className={styles[`bar${index + 1}`]}
                              key={index}
                            ></div>
                          )
                        )}
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
                        {Array.from({ length: averagePriceGrade }).map(
                          (_, index) => (
                            <div
                              className={styles[`bar${index + 1}`]}
                              key={index}
                            ></div>
                          )
                        )}
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
                        {Array.from({ length: averageRoomGrade }).map(
                          (_, index) => (
                            <div
                              className={styles[`bar${index + 1}`]}
                              key={index}
                            ></div>
                          )
                        )}
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
      <h2 style={{ textAlign: "center", fontSize: "2rem" }}>
        You may also like...
      </h2>
      <div className={styles.slider}>
        <Slider settings={settingsTour}>
          {tours.length > 0 ? (
            tours.slice(0, 8).map((tour) => (
              <Slide key={tour._id}>
                <Link
                  to={`/tourDetails/${tour._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <TourCard
                    _id={tour._id}
                    image={tour.image}
                    location={tour.place}
                    title={tour.title}
                    grade={tour.grade}
                    reviews={tour.reviewNumber}
                    duration={tour.duration}
                    price={tour.price}
                  />
                </Link>
              </Slide>
            ))
          ) : (
            <p>No tours available</p>
          )}
        </Slider>
      </div>
      <Footer />
    </>
  );
};

export default TourDetails;
