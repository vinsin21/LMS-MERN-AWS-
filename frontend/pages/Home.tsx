import React from 'react';
import { Hero } from '../components/Hero';
import { Community } from '../components/Community';
import { Testimonials } from '../components/Testimonials';
import { Blog } from '../components/Blog';
import { Roadmap } from '../components/Roadmap';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Community />
      <Testimonials />
      <Blog />
      <Roadmap />
    </>
  );
};