
import { ArrowRight, MapPin, Clock } from "lucide-react";

const PopularRoutes = () => {
  const routes = [
    {
      from: "Delhi",
      to: "Mumbai",
      duration: "18 hrs",
      price: "₹1,200",
      image: "photo-1472396961693-142e6e269027"
    },
    {
      from: "Bangalore",
      to: "Chennai",
      duration: "6 hrs",
      price: "₹800",
      image: "photo-1466721591366-2d5fba72006d"
    },
    {
      from: "Pune",
      to: "Goa",
      duration: "10 hrs",
      price: "₹900",
      image: "photo-1493962853295-0fd70327578a"
    },
    {
      from: "Hyderabad",
      to: "Tirupati",
      duration: "8 hrs",
      price: "₹600",
      image: "photo-1721322800607-8c38375eef04"
    },
    {
      from: "Jaipur",
      to: "Udaipur",
      duration: "5 hrs",
      price: "₹500",
      image: "photo-1618160702438-9b02ab6515c9"
    },
    {
      from: "Kolkata",
      to: "Darjeeling",
      duration: "12 hrs",
      price: "₹1,000",
      image: "photo-1472396961693-142e6e269027"
    }
  ];

  return (
    <section className="popular-routes">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Routes</h2>
          <p className="section-description">
            Discover the most traveled routes across India with comfortable buses and best prices
          </p>
        </div>

        <div className="routes-grid">
          {routes.map((route, index) => (
            <div key={index} className="route-card">
              <div className="route-image">
                <img
                  src={`https://images.unsplash.com/${route.image}?auto=format&fit=crop&w=400&h=300`}
                  alt={`${route.from} to ${route.to}`}
                />
                <div className="route-price">{route.price}</div>
              </div>
              
              <div className="route-content">
                <div className="route-cities">
                  <div className="route-city">
                    <MapPin style={{ width: '1rem', height: '1rem', color: '#ff6b35' }} />
                    <span>{route.from}</span>
                  </div>
                  <ArrowRight style={{ width: '1rem', height: '1rem', color: '#9ca3af' }} />
                  <div className="route-city">
                    <MapPin style={{ width: '1rem', height: '1rem', color: '#ff6b35' }} />
                    <span>{route.to}</span>
                  </div>
                </div>

                <div className="route-details">
                  <div className="route-duration">
                    <Clock style={{ width: '1rem', height: '1rem' }} />
                    <span>{route.duration}</span>
                  </div>
                  <div className="route-starting">Starting from</div>
                </div>

                <button className="route-btn">
                  Book Now
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-btn">
          <button className="btn btn-outline">View All Routes</button>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
