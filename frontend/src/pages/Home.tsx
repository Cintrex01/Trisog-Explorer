import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import styles from "./Home.module.css";
import TitleSubHome from "../components/TitleSubHome";
const Home = () => {
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
      <Footer />
    </div>
  );
};

export default Home;
