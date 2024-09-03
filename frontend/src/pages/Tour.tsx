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
import { FaSortAlphaDown } from "react-icons/fa";

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
  const [filteredTours, setFilteredTours] = useState<TourProps[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [price, setPrice] = useState(0);
  const [continents, setContinents] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<{ [key: string]: string[] }>(
    {}
  );
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("select");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTours = filteredTours.slice(indexOfFirstItem, indexOfLastItem);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  useEffect(() => {
    loadTours();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterTours();
  }, [
    selectedGrades,
    tours,
    selectedCategories,
    selectedContinents,
    selectedDestinations,
    price,
    sortBy,
  ]);

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

  const filterTours = () => {
    let filtered = [...tours];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((tour) =>
        selectedCategories.includes(tour.type)
      );
    }

    if (selectedContinents.length > 0) {
      filtered = filtered.filter((tour) =>
        selectedContinents.includes(tour.continent)
      );
    }

    if (selectedDestinations.length > 0) {
      filtered = filtered.filter((tour) =>
        selectedDestinations.includes(tour.place)
      );
    }

    if (price > 0) {
      filtered = filtered.filter((tour) => tour.price <= price);
    }

    if (selectedGrades.length > 0) {
      const minGrade = Math.min(...selectedGrades);
      filtered = filtered.filter((tour) => tour.grade >= minGrade);
    }

    if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredTours(filtered);
  };

  const handleGradeChange = (grade: number) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const handleCategoryChange = (type: string) => {
    setSelectedCategories((prev) =>
      prev.includes(type) ? prev.filter((cat) => cat !== type) : [...prev, type]
    );
  };

  const handleDestinationChange = (place: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(place)
        ? prev.filter((dest) => dest !== place)
        : [...prev, place]
    );
  };

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
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(tour.type)}
                  />
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
                      <input
                        type="checkbox"
                        onChange={() => handleDestinationChange(place)}
                      />
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
            {[5, 4, 3, 2, 1].map((grade) => (
              <div className={styles.checkOption} key={grade}>
                <input
                  type="checkbox"
                  onChange={() => handleGradeChange(grade)}
                  checked={selectedGrades.includes(grade)}
                />
                <p>{grade} Stars & Up</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pagColumn}>
          <div className={styles.sort}>
            <p>{filteredTours.length} tours</p>
            <div>
              <p>
                Sort by{" "}
                <i>
                  <FaSortAlphaDown />
                </i>
              </p>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option value="">Select</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
              </select>
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
          </div>
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
