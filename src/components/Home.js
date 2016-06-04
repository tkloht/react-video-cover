import React from 'react';
import Title from 'react-title-component';

const Home = () => (
  <div>
    <Title render={prev => `${prev} | Home`} />
    <p>Home!</p>
  </div>
);

export default Home;
