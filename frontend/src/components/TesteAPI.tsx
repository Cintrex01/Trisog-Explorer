import { useEffect, useState } from "react";
import { api } from "../services/api";
import TourCard from "./TourCard";

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

const TesteAPI = () => {
  const [tours, setTours] = useState<TourProps[]>([]);

  useEffect(() => {
    loadTours();
  }, []);

  async function loadTours() {
    try {
      const response = await api.get("/tours");
      console.log(response.data);
      setTours(response.data.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  }

  return (
    <div>
      {tours.length > 0 ? (
        tours.map((tour) => (
          <div key={tour._id} style={{ marginBottom: "20px" }}>
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
                backgroundColor: "lightgray",
                fontWeight: 700,
                padding: "10px",
              }}
            >
              <span>ID: {tour._id}</span>
              <span>Title: {tour.title}</span>
              <span>Place: {tour.place}</span>
              <span>Continent: {tour.continent}</span>
              <span>Type: {tour.type}</span>
              <span>Category: {tour.category}</span>
              <span>Grade: {tour.grade}</span>
              <span>Review Number: {tour.reviewNumber}</span>
              <span>Start Day: {tour.startDay}</span>
              <span>Duration: {tour.duration} days</span>
              <span>Price: ${tour.price}</span>
              <span>Max People: {tour.maxPeople}</span>
              <span>Min Age: {tour.minAge}</span>
              <span>Description: {tour.description}</span>
              <span>
                <img src={tour.image} alt="" />
              </span>
              <span>__v: {tour.__v}</span>
            </p>
            <div>
              <h4>Reviews:</h4>
              {tour.reviews.length > 0 ? (
                tour.reviews.map((review, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <p>
                      <span>Name: {review.name}</span>
                      <span>Email: {review.email}</span>
                      <span>Comment: {review.comment}</span>
                      <span>Services Grade: {review.servicesGrade}</span>
                      <span>Locations Grade: {review.locationsGrade}</span>
                      <span>Amenities Grade: {review.amenitiesGrade}</span>
                      <span>Prices Grade: {review.pricesGrade}</span>
                      <span>Room Grade: {review.roomGrade}</span>
                      <span>Total Grade: {review.totalGrade}</span>
                      <span>Date: {review.date}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: " center",
                flexWrap: "wrap",
              }}
            >
              {tours.length > 0 ? (
                tours.map((tour) => (
                  <TourCard
                    key={tour._id}
                    image={tour.image}
                    location={tour.place}
                    title={tour.title}
                    grade={tour.grade}
                    reviews={tour.reviewNumber}
                    duration={tour.duration}
                    price={tour.price}
                  />
                ))
              ) : (
                <p>No tours available</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No tours available</p>
      )}
    </div>
  );
};

export default TesteAPI;
