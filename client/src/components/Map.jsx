import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import indiaGeoJson from '../india-states.json';

const Map = ({onCitySelect}) => {
  // State to store the selected city
  const [selectedCity, setSelectedCity] = useState(null);

  // List of 19 cities with coordinates for markers
  const cities = [
    { name: 'Ahmedabad', coordinates: [72.5714, 23.0225] },
    { name: 'Bengaluru', coordinates: [77.5946, 12.9716] },
    { name: 'Chennai', coordinates: [80.2707, 13.0827] },
    { name: 'Coimbatore', coordinates: [76.9558, 11.0168] },
    { name: 'Delhi', coordinates: [77.209, 28.6139] },
    { name: 'Ghaziabad', coordinates: [77.4538, 28.6692] },
    { name: 'Hyderabad', coordinates: [78.4867, 17.385] },
    { name: 'Indore', coordinates: [75.8577, 22.7196] },
    { name: 'Jaipur', coordinates: [75.7873, 26.9124] },
    { name: 'Kanpur', coordinates: [80.3319, 26.4499] },
    { name: 'Kochi', coordinates: [76.2711, 9.9312] },
    { name: 'Kolkata', coordinates: [88.3639, 22.5726] },
    { name: 'Kozhikode', coordinates: [75.7804, 11.2588] },
    { name: 'Lucknow', coordinates: [80.9462, 26.8467] },
    { name: 'Mumbai', coordinates: [72.8777, 19.076] },
    { name: 'Nagpur', coordinates: [79.0882, 21.1458] },
    { name: 'Patna', coordinates: [85.1376, 25.5941] },
    { name: 'Pune', coordinates: [73.8567, 18.5204] },
    { name: 'Surat', coordinates: [72.8311, 21.1702] },
  ];

  const handleCityClick = (city) => {
    setSelectedCity(city.name); // Set the selected city in state
    onCitySelect(city.name)
    console.log("Selected City:", city.name);
  };

  return (
    <div>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1000, center: [78.9629, 22.5937] }} style={{ width: "100%", height: "600px" }}>
        <Geographies geography={indiaGeoJson}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                style={{
                  default: { fill: "#D6D6DA", outline: "none" },
                  hover: { fill: "#D6D6DA", outline: "none" },
                  pressed: { fill: "#D6D6DA", outline: "none" },
                }} 
              />
            ))
          }
        </Geographies>
        {cities.map((city, index) => (
          <Marker key={index} coordinates={city.coordinates} onClick={() => handleCityClick(city)}>
            <circle r={8} fill="#F53" stroke="#fff" strokeWidth={2} />
            <text textAnchor="middle" y={-10} style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: 10 }}>
              {city.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default Map;