import React, { useEffect, useState } from "react";
import styles from "./Tour.module.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { CiSearch } from "react-icons/ci";
import { api } from "../services/api";
import TourCard from "../components/TourCard";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

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

export interface TourProps {
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

interface CategoryData {
  type: string;
  tourCount: number;
}

const Tour = () => {
  const [tours, setTours] = useState<TourProps[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [price, setPrice] = useState(0);
  const [continents, setContinents] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<{ [key: string]: string[] }>(
    {}
  );

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  useEffect(() => {
    loadTours();
    window.scrollTo(0, 0);
  }, []);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTours = tours.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  useEffect(() => {
    if (tours.length > 0) {
      const categoryMap: { [key: string]: CategoryData } = {};
      const continentSet = new Set<string>();
      const destinationMap: { [key: string]: Set<string> } = {};

      tours.forEach((tour) => {
        // Categorias
        if (!categoryMap[tour.type]) {
          categoryMap[tour.type] = {
            type: tour.type,
            tourCount: 1,
          };
        } else {
          categoryMap[tour.type].tourCount += 1;
        }

        // Continentes
        continentSet.add(tour.continent);

        // Destinos por continente
        if (!destinationMap[tour.continent]) {
          destinationMap[tour.continent] = new Set();
        }
        destinationMap[tour.continent].add(tour.place);
      });

      setCategoryData(Object.values(categoryMap));
      setContinents(Array.from(continentSet));
      const destinationsObj: { [key: string]: string[] } = {};
      for (const [continent, placesSet] of Object.entries(destinationMap)) {
        destinationsObj[continent] = Array.from(placesSet);
      }
      setDestinations(destinationsObj);
    }
  }, [tours]);

  async function loadTours() {
    try {
      const response = await api.get("/tours");
      setTours(response.data.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  }

  return (
    <>
      <Header />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Tour Package</h1>
        <h3 className={styles.subtitle}>
          Home / <span style={{ color: "#FD5056" }}>Tour Package</span>
        </h3>
      </div>
      <SearchBar />
      <div className={styles.container}>
        <div className={styles.containerFilters}>
          <div className={styles.searchBox}>
            <label htmlFor="">Search</label>
            <div className={styles.searchInput}>
              <input type="text" placeholder="Type anything..." />
              <i className={styles.searchIcon}>
                <CiSearch />
              </i>
            </div>
          </div>
          <div className={styles.priceBox}>
            <label htmlFor="">Filter By</label>
            <input
              type="range"
              min="0"
              max="1000"
              onChange={handleRangeChange}
              value={price}
            />
            <div className={styles.prices}>
              <p>$0.00</p>
              <p className={styles.actualPrice}>${price}.00</p>
            </div>
            <button>Submit</button>
          </div>
          <div className={styles.categoriesBox}>
            <label htmlFor="">Categories</label>
            {categoryData.length > 0 ? (
              categoryData.map((tour) => (
                <div className={styles.checkOption} key={tour.type}>
                  <input type="checkbox" name="" id="" />
                  <p>{tour.type}</p>
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
          <div className={styles.destinationsBox}>
            <label htmlFor="">Destinations</label>
            {continents.length > 0 ? (
              continents.map((continent) => (
                <div className={styles.continent} key={continent}>
                  <label htmlFor="">{continent}</label>
                  {destinations[continent].map((place) => (
                    <div className={styles.checkOption} key={place}>
                      <input type="checkbox" name="" id="" />
                      <p>{place}</p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No destinations available</p>
            )}
          </div>
          <div className={styles.gradeBox}>
            <div className={styles.gradeBoxLabel}>
              <label>Reviews</label>
            </div>
            <div className={styles.checkOption}>
              <input type="checkbox" name="" id="" />
              <p>5 Stars</p>
            </div>
            <div className={styles.checkOption}>
              <input type="checkbox" name="" id="" />
              <p>4 Stars & Up</p>
            </div>
            <div className={styles.checkOption}>
              <input type="checkbox" name="" id="" />
              <p>3 Stars & Up</p>
            </div>
            <div className={styles.checkOption}>
              <input type="checkbox" name="" id="" />
              <p>2 Stars & Up</p>
            </div>
            <div className={styles.checkOption}>
              <input type="checkbox" name="" id="" />
              <p>1 Stars & Up</p>
            </div>
          </div>
        </div>
        <div className={styles.containerPagination}>
          {currentTours.length > 0 ? (
            currentTours.map((tour) => (
              <Link
                to={`/tourDetails/${tour._id}`}
                style={{ textDecoration: "none" }}
              >
                <div key={tour._id}>
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
                </div>
              </Link>
            ))
          ) : (
            <p>No tours available</p>
          )}
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i>
                <FaChevronLeft />
              </i>
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i>
                <FaChevronRight />
              </i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tour;
