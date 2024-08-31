import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapProps {
  city: string;
}

const Map: React.FC<MapProps> = ({ city }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyB3FJMqoitucCKpX_63uffuXWsSM_VS0c0`
        );
        const data = await response.json();
        const locationData = data.results[0].geometry.location;
        setLocation(locationData);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [city]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB3FJMqoitucCKpX_63uffuXWsSM_VS0c0">
      {location ? (
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={location}
          zoom={12}
        >
          <Marker position={location} />
        </GoogleMap>
      ) : (
        <p>Loading map...</p>
      )}
    </LoadScript>
  );
};

export default Map;
