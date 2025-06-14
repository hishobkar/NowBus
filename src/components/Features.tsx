
import { Bus, Ticket, Map, Plane } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bus,
      title: "Comfortable Buses",
      description: "Travel in comfort with our fleet of modern, air-conditioned buses equipped with reclining seats and entertainment systems."
    },
    {
      icon: Ticket,
      title: "Easy Booking",
      description: "Book your tickets in just a few clicks with our user-friendly interface. No hassle, no waiting in queues."
    },
    {
      icon: Map,
      title: "Extensive Network",
      description: "Connect to over 1000+ routes across India. From metro cities to remote destinations, we've got you covered."
    },
    {
      icon: Plane,
      title: "24/7 Support",
      description: "Our customer support team is available round the clock to assist you with any queries or booking issues."
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose BusVoyager?</h2>
          <p className="section-description">
            Experience the best in bus travel with our premium services and customer-first approach
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h3 className="cta-title">Ready to Start Your Journey?</h3>
          <p className="cta-description">
            Join thousands of satisfied customers who trust BusVoyager for their travel needs. 
            Book your bus ticket today and experience the difference.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn-primary">Book Your First Trip</button>
            <button className="cta-btn-secondary">Download Mobile App</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
