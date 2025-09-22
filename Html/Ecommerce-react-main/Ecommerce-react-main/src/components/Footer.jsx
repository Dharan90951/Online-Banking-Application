import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-white text-dark pt-4 pb-2 border-top">
      <div className="container">
        <div className="row">
          {/* About Us */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>We offer high-quality products at the best prices. Your satisfaction is our priority.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-success">Home</a></li>
              <li><a href="/product" className="text-success">Product</a></li>
              <li><a href="/about" className="text-success">About</a></li>
              <li><a href="/contact" className="text-success">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>📍 123 Ram nager,Velachery,Chennai</p>
            <p>📞 +91 9342125465</p>
            <p>📧 contact@shopmart.com</p>
          </div>
        </div>

        <hr className="bg-dark" />

        {/* Social Media */}
        <div className="text-center">
          <a href="/" className="text-dark mx-2"><i className="fab fa-facebook fa-lg"></i></a>
          <a href="/" className="text-dark mx-2"><i className="fab fa-twitter fa-lg"></i></a>
          <a href="/" className="text-dark mx-2"><i className="fab fa-instagram fa-lg"></i></a>
          <a href="/" className="text-dark mx-2"><i className="fab fa-linkedin fa-lg"></i></a>
        </div>

        <p className="text-center mt-3 mb-0">© 2025 Shop Mart. All Rights Reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
