import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import styles from "./Home.module.css";
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
      <Footer />
    </div>
  );
};

export default Home;
