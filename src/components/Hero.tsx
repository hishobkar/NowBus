import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowRightLeft } from "lucide-react";

const Hero = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const navigate = useNavigate();

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearchBusesClick = () => {
    navigate('/search_list'); // Navigate to search_list page
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Book Your Bus Journey
            <span className="hero-subtitle">Across India</span>
          </h1>
          <p className="hero-description">
            Experience comfortable and affordable bus travel with BusVoyager. 
            Book tickets for over 1000+ routes across India.
          </p>
        </div>

        <div className="search-card">
          <div className="search-grid">
            {/* From City */}
            <div className="form-group">
              <label className="form-label">From</label>
              <div style={{ position: 'relative' }}>
                <MapPin className="form-icon" />
                <input
                  type="text"
                  placeholder="Departure city"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="swap-btn">
              <button
                onClick={handleSwapCities}
                className="swap-button"
              >
                <ArrowRightLeft />
              </button>
            </div>

            {/* To City */}
            <div className="form-group">
              <label className="form-label">To</label>
              <div style={{ position: 'relative' }}>
                <MapPin className="form-icon" />
                <input
                  type="text"
                  placeholder="Destination city"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="form-label">Departure</label>
              <div style={{ position: 'relative' }}>
                <Calendar className="form-icon" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <button onClick={handleSearchBusesClick} className="search-btn">
            Search Buses
          </button>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Routes</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Cities</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
