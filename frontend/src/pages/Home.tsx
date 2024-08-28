import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import styles from "./Home.module.css";
import TitleSubHome from "../components/TitleSubHome";
import { Slider, SliderProps, Slide } from "../components/Slider";
import TourCard from "../components/TourCard";
import { api } from "../services/api";

interface Review {
  name: string;
  email: string;
  comment: string;
  servicesGrade: number;
  locationsGrade: number;
  amenitiesGrade: number;
  pricesGrade: number;
  roomGrade: number;
  totalGrade: number;
  date: string;
}

interface TourProps {
  _id: string;
  title: string;
  place: string;
  continent: string;
  type: string;
  category: string;
  grade: number;
  reviewNumber: number;
  reviews: Review[];
  startDay: string;
  duration: number;
  price: number;
  maxPeople: number;
  minAge: number;
  image: string;
  description: string;
  __v?: number;
}

const Home = () => {
  const [tours, setTours] = useState<TourProps[]>([]);

  const settings: SliderProps = {
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
    loadTours();
  }, []);

  async function loadTours() {
    try {
      const response = await api.get("/tours");
      setTours(response.data.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.titleContainer}>
        <h2 className={styles.pretitle}>Save 15% off in Worldwide</h2>
        <h1 className={styles.title}>Travel & Adventures</h1>
        <h3 className={styles.subtitle}>
          Find awesome hotel,tour, car and activities in London
        </h3>
      </div>
      <SearchBar />
      <TitleSubHome title="Tours" subtitle="Most Popular Tours" />
      <div className={styles.slider}>
        <Slider settings={settings}>
          {tours.length > 0 ? (
            tours.map((tour) => (
              <Slide key={tour._id}>
                <TourCard
                  image={tour.image}
                  location={tour.place}
                  title={tour.title}
                  grade={tour.grade}
                  reviews={tour.reviewNumber}
                  duration={tour.duration}
                  price={tour.price}
                />
              </Slide>
            ))
          ) : (
            <p>No tours available</p>
          )}
        </Slider>
      </div>

      <div className={styles.numbersContainer}>
        <div className={styles.numbers}>
          <div className={styles.numberBox}>
            <h2 className={styles.number}>120+</h2>
            <p className={styles.numberText}>Total Destination</p>
          </div>
          <div className={styles.numberBox}>
            <h2 className={styles.number}>500+</h2>
            <p className={styles.numberText}>Travel Packages</p>
          </div>
          <div className={styles.numberBox}>
            <h2 className={styles.number}>12k+</h2>
            <p className={styles.numberText}>Total Travelers</p>
          </div>
          <div className={styles.numberBox}>
            <h2 className={styles.number}>7k+</h2>
            <p className={styles.numberText}>Positive Reviews</p>
          </div>
        </div>
      </div>
      <div className={styles.wcuContainer}>
        <div className={styles.wcuBoxes}>
          <div className={styles.wcuImage}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2FwhyChooseUs%2FwhyChooseUs.png?alt=media&token=4836b0d9-d4a9-4f82-9c90-3d35c39fb456"
              alt="Two images and a button written watch now"
            />
          </div>
          <div className={styles.wcuText}>
            <div className={styles.wcuDescription}>
              <h3>Why Choose Us</h3>
              <h2>Our Experiencies Meet High Quality Standarts</h2>
              <p>
                Holisticly optimize proactive strategic theme areas rather than
                effective manufactured products create.
              </p>
            </div>
            <div className={styles.wcuBenefitsRow}>
              <div className={styles.wcuBenefitsColumn}>
                <div className={styles.benefit}>
                  <i className={styles.check}>
                    <FaCheck />
                  </i>
                  <p>Travel Plan</p>
                </div>
                <div className={styles.benefit}>
                  <i className={styles.check}>
                    <FaCheck />
                  </i>
                  <p>Hand-picked Tour</p>
                </div>
              </div>
              <div className={styles.wcuBenefitsColumn}>
                <div className={styles.benefit}>
                  <i className={styles.check}>
                    <FaCheck />
                  </i>
                  <p>Cheap Rates</p>
                </div>
                <div className={styles.benefit}>
                  <i className={styles.check}>
                    <FaCheck />
                  </i>
                  <p>Private Guide</p>
                </div>
              </div>
            </div>
            <div className={styles.wcuButton}>
              <button>Contact Us</button>
            </div>
          </div>
        </div>
      </div>
      <TitleSubHome title="Browse By Category" subtitle="Pick A Tour Type" />
      <div className={styles.wtsContainer}>
        <div className={styles.wtsBoxes}>
          <div className={styles.wtsImage}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2FwhatTravelersSay%2FwhatTravelersSay.png?alt=media&token=d418f704-1a54-463d-9d26-739dd3eef85d"
              alt="three people"
            />
          </div>
          <div className={styles.wtsText}>
            <TitleSubHome title="Testimonials" subtitle="What Travelers Say" />
            <h2 className={styles.quote}>”</h2>
            <p className={styles.travelerComment}>
              "The UI designs he crafted are top-notch, and the <br /> design
              system he integrated allows for straight <br /> forward fixes and
              bulk updates throughout almost <br />
              every area of the app."
            </p>
            <p className={styles.author}>-By Molie Rosa, Photographer</p>
          </div>
        </div>
      </div>
      <TitleSubHome title="Updates" subtitle="Latest Travel Guide" />
      <div>
        <div className={styles.latestTravelGuideContainer}>
          <div className={styles.latestTravelBox}>
            <div className={styles.latestTravelImage}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2FlatestTravelGuide%2F258076_65154e9b061b7.jpg?alt=media&token=b538652c-2ffe-4138-8ffb-e06eb7267fad"
                alt="students"
              />
            </div>
            <div className={styles.latestTravelText}>
              <div className={styles.latestTravelDetails}>
                <p>July 13,2023</p>
                <span>• Admin</span>
              </div>
              <div className={styles.latestTravelDescription}>
                <p>The impact of Covid-19 on travel & tourism industry</p>
              </div>
            </div>
          </div>
          <div className={styles.latestTravelBox}>
            <div className={styles.latestTravelImage}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2FlatestTravelGuide%2Fthe-fedora-hat3.webp?alt=media&token=3bfe19f2-c1f0-49b4-b8f9-08ade60dfffd"
                alt="Woman in front of a lake"
              />
            </div>
            <div className={styles.latestTravelText}>
              <div className={styles.latestTravelDetails}>
                <p>July 13,2023</p>
                <span>• Admin</span>
              </div>
              <div className={styles.latestTravelDescription}>
                <p>The impact of Covid-19 on travel & tourism industry</p>
              </div>
            </div>
          </div>
          <div className={styles.latestTravelBox}>
            <div className={styles.latestTravelImage}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2FlatestTravelGuide%2FCaptura-de-tela-2024-08-27-171255.png?alt=media&token=6d0b0ec7-dda5-44c5-ab0b-8d53e501518d"
                alt="Woman with pineapples"
              />
            </div>
            <div className={styles.latestTravelText}>
              <div className={styles.latestTravelDetails}>
                <p>July 13,2023</p>
                <span>• Admin</span>
              </div>
              <div className={styles.latestTravelDescription}>
                <p>The impact of Covid-19 on travel & tourism industry</p>
              </div>
            </div>
          </div>
          <div className={styles.latestTravelBox}>
            <div className={styles.latestTravelImage}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2FlatestTravelGuide%2Fretrato-ao-ar-livre-na-parte-de-tras-de-um-turista-masculino-carregando-uma-grande-mochila-decorada-.jpg?alt=media&token=2391a3e3-718a-4b76-b353-7237ab5d703b"
                alt="Man with backpack in front of a lake"
              />
            </div>
            <div className={styles.latestTravelText}>
              <div className={styles.latestTravelDetails}>
                <p>July 13,2023</p>
                <span>• Admin</span>
              </div>
              <div className={styles.latestTravelDescription}>
                <p>The impact of Covid-19 on travel & tourism industry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logosContainer}>
        <div className={styles.logosBox}>
          <img src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2Flogos%2Fverao-e-tipografia-de-ferias-ilustracao_53876-3263-removebg-preview.png?alt=media&token=085e82c4-ff1f-41fb-8aa9-940eb3d55d68" />
        </div>
        <div className={styles.logosBox}>
          <img src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2Flogos%2Faim-high-font-3-big-removebg-preview.png?alt=media&token=c09aa0d7-faf8-45fa-b27f-b0c60a7da8d2" />
        </div>
        <div className={styles.logosBox}>
          <img src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2Flogos%2F56905505-mountain-landscape-removebg-preview.png?alt=media&token=0337010d-4e0c-47f7-87b5-578dee79638a" />
        </div>
        <div className={styles.logosBox}>
          <img src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2Flogos%2Fimages-removebg-preview.png?alt=media&token=cfe7fc11-33d3-4414-b75f-639455a3f2c0" />
        </div>
        <div className={styles.logosBox}>
          <img src="https://firebasestorage.googleapis.com/v0/b/desafio3compass.appspot.com/o/ImagensEstaticas%2Flogos%2F8492115-removebg-preview.png?alt=media&token=96579da2-514d-4785-a073-bd9fb2a3a4af" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
