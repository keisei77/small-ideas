import React from 'react';

const Footer = () => {
  return (
    <div className="pb-4 px-4">
      {' '}
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://nextjs.org/">Next.js</a>
    </div>
  );
};

export default Footer;
