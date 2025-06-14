
import { useState } from "react";
import { Bus, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Bus className="logo-icon" />
            <span className="logo-text">BusVoyager</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Routes</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
          </nav>

          {/* Desktop CTA */}
          <div className="header-buttons">
            <button className="btn btn-outline">Login</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav-links">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Routes</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
          </nav>
          <div className="mobile-nav-buttons">
            <button className="btn btn-outline">Login</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
