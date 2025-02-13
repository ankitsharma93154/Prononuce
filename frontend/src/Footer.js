import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="footer">
      <p>Copyright &copy; {currentYear} Pronounce</p>
    </footer>
  );
};

export default Footer;
