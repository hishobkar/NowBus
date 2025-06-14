import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft, Star } from 'lucide-react';

// Mock API function to simulate fetching bus data
const fetchBusData = async (page = 1, pageSize = 4) => {
  try {
    const response = await fetch(`http://nowbus.eu-north-1.elasticbeanstalk.com/api/BusInfo?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    return {
      buses: data.data,
      hasMore: page < data.totalPages,
      total: data.totalItems
    };
  } catch (error) {
    console.error('Error fetching bus data:', error);
    return {
      buses: [],
      hasMore: false,
      total: 0
    };
  }
};

// Indian cities data for autocomplete
const indianCities = [
  'Agra', 'Ahmedabad', 'Ajmer', 'Aligarh', 'Allahabad', 'Amritsar', 'Aurangabad',
  'Bangalore', 'Belagavi', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai', 'Coimbatore',
  'Delhi', 'Dehradun', 'Dharamshala', 'Faridabad', 'Gandhinagar', 'Goa', 'Gurgaon', 'Guwahati',
  'Gwalior', 'Haridwar', 'Hyderabad', 'Indore', 'Jaipur', 'Jalandhar', 'Jammu', 'Jodhpur',
  'Kanpur', 'Kochi', 'Kolkata', 'Lucknow', 'Ludhiana', 'Madurai', 'Mangalore', 'Mumbai',
  'Mysore', 'Nagpur', 'Nashik', 'Noida', 'Patna', 'Pondicherry', 'Pune', 'Rajkot',
  'Ranchi', 'Shimla', 'Srinagar', 'Surat', 'Thiruvananthapuram', 'Udaipur', 'Vadodara', 'Varanasi', 'Vijayawada', 'Visakhapatnam'
];

const SearchList = () => {
  const [sortBy, setSortBy] = useState('ratings');
  const [filters, setFilters] = useState({
    ac: false,
    sleeper: false,
    singleSeat: false,
    seater: false,
    nonAc: false,
    evening: false,
    highRated: false,
    liveTracking: false
  });

  // Lazy loading states
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Autocomplete states
  const [fromCity, setFromCity] = useState('Belagavi');
  const [toCity, setToCity] = useState('Bangalore');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Load initial data
  useEffect(() => {
    loadBuses(1, true);
  }, []);

  const loadBuses = async (pageNum = 1, reset = false) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const data = await fetchBusData(pageNum, 10);
      setBuses(prev => reset ? data.buses : [...prev, ...data.buses]);
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading buses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadBuses(page + 1);
    }
  };

  // Autocomplete logic
  const filterCities = (input, setter, showSetter) => {
    if (input.length === 0) {
      setter([]);
      showSetter(false);
      return;
    }
    
    const filtered = indianCities
      .filter(city => city.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5);
    
    setter(filtered);
    showSetter(true);
  };

  const handleFromCityChange = (value) => {
    setFromCity(value);
    filterCities(value, setFromSuggestions, setShowFromSuggestions);
  };

  const handleToCityChange = (value) => {
    setToCity(value);
    filterCities(value, setToSuggestions, setShowToSuggestions);
  };

  const selectFromCity = (city) => {
    setFromCity(city);
    setShowFromSuggestions(false);
  };

  const selectToCity = (city) => {
    setToCity(city);
    setShowToSuggestions(false);
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  return (
    <div className="search-list">
      {/* Header with search info */}
      <div className="search-header">
        <div className="container">
          <div className="search-route-info">
            <div className="route-section">
              <span className="route-label">From</span>
              <div className="autocomplete-container">
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => handleFromCityChange(e.target.value)}
                  onFocus={() => filterCities(fromCity, setFromSuggestions, setShowFromSuggestions)}
                  onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                  className="route-city-input"
                  placeholder="Enter departure city"
                />
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="autocomplete-suggestions">
                    {fromSuggestions.map((city, index) => (
                      <div
                        key={index}
                        className="autocomplete-item"
                        onClick={() => selectFromCity(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ArrowRightLeft className="route-swap-icon" onClick={handleSwapCities} />
            <div className="route-section">
              <span className="route-label">To</span>
              <div className="autocomplete-container">
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => handleToCityChange(e.target.value)}
                  onFocus={() => filterCities(toCity, setToSuggestions, setShowToSuggestions)}
                  onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                  className="route-city-input"
                  placeholder="Enter destination city"
                />
                {showToSuggestions && toSuggestions.length > 0 && (
                  <div className="autocomplete-suggestions">
                    {toSuggestions.map((city, index) => (
                      <div
                        key={index}
                        className="autocomplete-item"
                        onClick={() => selectToCity(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="route-section">
              <span className="route-label">Date of journey</span>
              <span className="route-date">08 Jun, 2025</span>
              <div className="date-buttons">
                <button className="date-btn active">Today</button>
                <button className="date-btn">Tomorrow</button>
              </div>
            </div>
            <button className="search-btn-header">Search</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <h3 className="filters-title">Filter buses</h3>
            
            <div className="filter-group">
              <div className="filter-row">
                <button 
                  className={`filter-btn ${filters.ac ? 'active' : ''}`}
                  onClick={() => handleFilterChange('ac')}
                >
                  AC
                </button>
                <button 
                  className={`filter-btn ${filters.sleeper ? 'active' : ''}`}
                  onClick={() => handleFilterChange('sleeper')}
                >
                  Sleeper
                </button>
              </div>
              <div className="filter-row">
                <button 
                  className={`filter-btn ${filters.singleSeat ? 'active' : ''}`}
                  onClick={() => handleFilterChange('singleSeat')}
                >
                  Single seat
                </button>
                <button 
                  className={`filter-btn ${filters.seater ? 'active' : ''}`}
                  onClick={() => handleFilterChange('seater')}
                >
                  Seater
                </button>
              </div>
              <div className="filter-row">
                <button 
                  className={`filter-btn ${filters.nonAc ? 'active' : ''}`}
                  onClick={() => handleFilterChange('nonAc')}
                >
                  Non-AC
                </button>
                <button 
                  className={`filter-btn ${filters.evening ? 'active' : ''}`}
                  onClick={() => handleFilterChange('evening')}
                >
                  Evening
                </button>
              </div>
              <div className="filter-row">
                <button 
                  className={`filter-btn ${filters.highRated ? 'active' : ''}`}
                  onClick={() => handleFilterChange('highRated')}
                >
                  High rated
                </button>
              </div>
              <div className="filter-row">
                <button 
                  className={`filter-btn ${filters.liveTracking ? 'active' : ''}`}
                  onClick={() => handleFilterChange('liveTracking')}
                >
                  Live tracking
                </button>
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-section-title">Departure time from source</h4>
            </div>

            <div className="filter-section">
              <h4 className="filter-section-title">Arrival time at destination</h4>
            </div>

            <div className="filter-section">
              <h4 className="filter-section-title">Bus type</h4>
            </div>

            <div className="filter-section">
              <h4 className="filter-section-title">Single window seater/sleeper</h4>
            </div>

            <div className="filter-section">
              <h4 className="filter-section-title">Bus features</h4>
            </div>
          </div>

          {/* Results Section */}
          <div className="results-section">
            <div className="results-header">
              <div className="results-info">
                <h2 className="results-count">{buses.length} buses found</h2>
                <div className="popular-route">
                  50000+ searches on this route last month
                </div>
              </div>
              <div className="sort-section">
                <span className="sort-label">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="ratings">Ratings</option>
                  <option value="departure">Departure time</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>

            {/* Bus List */}
            <div className="bus-list">
              {buses.map(bus => (
                <div key={bus.id} className="bus-card">
                  <div className="bus-info">
                    <div className="bus-operator">
                      <h3 className="operator-name">{bus.operator}</h3>
                      <div className="rating">
                        <Star className="star-icon" />
                        <span className="rating-value">{bus.rating}</span>
                        <span className="rating-count">{bus.reviews}</span>
                      </div>
                    </div>
                    <div className="bus-type">{bus.type}</div>
                    {bus.badge && <div className="bus-badge">{bus.badge}</div>}
                  </div>

                  <div className="bus-timing">
                    <div className="time-info">
                      <span className="departure-time">{bus.departureTime}</span>
                      <span className="arrival-time">{bus.arrivalTime}</span>
                    </div>
                    <div className="duration-seats">
                      <span className="duration">{bus.duration}</span>
                      <span className="seats">{bus.seats}</span>
                    </div>
                  </div>

                  <div className="bus-price">
                    <div className="price">₹{bus.price.toLocaleString()}</div>
                    <div className="price-label">Onwards</div>
                    <button className="view-seats-btn">View seats</button>
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className="load-more-container">
                  <button 
                    onClick={handleLoadMore} 
                    disabled={loading}
                    className="load-more-btn"
                  >
                    {loading ? 'Loading...' : 'Load More Buses'}
                  </button>
                </div>
              )}

              {loading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Loading more buses...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
