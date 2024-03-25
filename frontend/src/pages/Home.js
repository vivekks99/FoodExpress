import React from 'react'
import MenuItems from '../ui/MenuItems'
import Carousel from '../ui/Carousel'
import IntoSection from '../ui/IntoSection';

const images = [
  '/images/fast-food.jpg',
  '/images/platter.jpg',
  '/images/food-delivery.jpg'
];

function Home() {

  return (
    <div>
      <IntoSection />
      <Carousel images={images} />
      <MenuItems />
    </div>
  )
}

export default Home