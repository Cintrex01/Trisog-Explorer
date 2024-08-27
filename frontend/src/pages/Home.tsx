import { useEffect, useState } from "react";
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
    spaceBetween: 50,
    slidesPerView: 4,
    navigation: true,
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
      <TitleSubHome title="Updates" subtitle="Latest Travel Guide" />
      <div>
        <div className={styles.latestTravelGuideContainer}>
          <div className={styles.latestTravelBox}>
            <div className={styles.latestTravelImage}>
              <img
                src="https://cdn.tourradar.com/s3/tour/232x150/258076_65154e9b061b7.jpg"
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
                src="https://img.baba-blog.com/2024/05/the-fedora-hat3.jpg?x-oss-process=style/full"
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
                src="https://i.postimg.cc/PqZmtSvC/Captura-de-tela-2024-08-27-171255.png"
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
                src="https://img.freepik.com/fotos-gratis/retrato-ao-ar-livre-na-parte-de-tras-de-um-turista-masculino-carregando-uma-grande-mochila-decorada-e-caminhando-para-as-montanhas-pela-manha_197531-4438.jpg"
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
          <img src="https://i.postimg.cc/x1qwQvXz/verao-e-tipografia-de-ferias-ilustracao-53876-3263-removebg-preview.png" />
        </div>
        <div className={styles.logosBox}>
          <img src="https://i.postimg.cc/90rSG9v9/aim-high-font-3-big-removebg-preview.png" />
        </div>
        <div className={styles.logosBox}>
          <img src="https://i.postimg.cc/QC7MfF7B/56905505-mountain-landscape-removebg-preview.png" />
        </div>
        <div className={styles.logosBox}>
          <img src="https://i.postimg.cc/bJq3Rn2J/images-removebg-preview.png" />
        </div>
        <div className={styles.logosBox}>
          <img src="https://i.postimg.cc/9Q4PPp81/8492115-removebg-preview.png" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
