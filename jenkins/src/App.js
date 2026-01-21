import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [studentCount, setStudentCount] = useState(45000);
  const courseRating = 4.7; // Changed from state to constant
  const [expanded, setExpanded] = useState(false);

  // Mock API call effect
  useEffect(() => {
    // Simulate fetching updated student count
    const timer = setTimeout(() => {
      setStudentCount(prev => prev + 100);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [studentCount]);

  const courseModules = [
    "Introduction to CI/CD",
    "Jenkins Pipeline Basics",
    "Docker Integration",
    "Kubernetes Deployment",
    "Advanced Security Practices",
    "Monitoring and Logging"
  ];

  const testimonials = [
    { name: "Alex Johnson", role: "DevOps Engineer", text: "This course transformed our deployment process!" },
    { name: "Sam Chen", role: "Platform Lead", text: "Best Jenkins course with hands-on labs." },
    { name: "Maria Garcia", role: "SRE", text: "From beginner to expert in 6 weeks." }
  ];

  const handleEnrollClick = () => {
    window.open('https://example.com/enroll', '_blank');
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <img src={logo} className="nav-logo" alt="Jenkins Course Logo" />
          <div className="nav-links">
            <a href="#course">Course</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#pricing">Pricing</a>
          </div>
          <button className="cta-button" onClick={handleEnrollClick}>
            Enroll Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="App-header">
        <div className="hero-content">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Master Jenkins CI/CD</h1>
          <p className="subtitle">Become a DevOps Expert with Hands-On Pipeline Development</p>
          
          <div className="stats-container">
            <div className="stat">
              <h3>{studentCount.toLocaleString()}+</h3>
              <p>Students Enrolled</p>
            </div>
            <div className="stat">
              <h3>45+</h3>
              <p>Hours of Content</p>
            </div>
            <div className="stat">
              <h3>{courseRating} ⭐</h3>
              <p>Course Rating</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Support Access</p>
            </div>
          </div>

          <a
            className="App-link"
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Jenkins on Udemy
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Course Description */}
        <section className="course-description">
          <h2>What You'll Learn</h2>
          <p>
            This comprehensive course takes you from Jenkins basics to advanced pipeline development.
            {expanded && " You'll learn to automate deployments, integrate with Docker and Kubernetes, implement security best practices, and build robust CI/CD pipelines that scale with your organization's needs."}
          </p>
          <button className="toggle-btn" onClick={toggleDescription}>
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        </section>

        {/* Curriculum Section */}
        <section className="curriculum">
          <h2>Course Curriculum</h2>
          <div className="modules-grid">
            {courseModules.map((module, index) => (
              <div key={index} className="module-card">
                <div className="module-number">{index + 1}</div>
                <h4>{module}</h4>
                <p>{index * 2 + 3} lectures • {index * 1.5 + 2}h</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h2>Student Success Stories</h2>
          <div className="testimonial-cards">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote">"</div>
                <p>{testimonial.text}</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing">
          <h2>Choose Your Plan</h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">$29.99</div>
              <ul>
                <li>✓ Full course access</li>
                <li>✓ Lifetime updates</li>
                <li>✓ Community access</li>
                <li>✗ Personal mentoring</li>
              </ul>
              <button className="pricing-btn" onClick={handleEnrollClick}>
                Get Started
              </button>
            </div>
            <div className="pricing-card featured">
              <div className="badge">Most Popular</div>
              <h3>Professional</h3>
              <div className="price">$79.99</div>
              <ul>
                <li>✓ Everything in Basic</li>
                <li>✓ 5 one-on-one sessions</li>
                <li>✓ Certificate of completion</li>
                <li>✓ Resume review</li>
              </ul>
              <button className="pricing-btn featured-btn" onClick={handleEnrollClick}>
                Get Professional
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="App-footer">
        <div className="footer-content">
          <div className="footer-info">
            <img src={logo} className="footer-logo" alt="logo" />
            <p>Master Jenkins CI/CD with our comprehensive course designed for DevOps professionals.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>support@jenkinscourse.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Jenkins Mastery Course. All rights reserved.</p>
          <p className="version">Application version: {process.env.REACT_APP_VERSION}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;