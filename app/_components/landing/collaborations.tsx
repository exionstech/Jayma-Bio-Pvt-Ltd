import React from 'react';
import { motion } from 'framer-motion';

const collaborationList = [
  {
    name: "Fresh Tomatoes",
    image: "/api/placeholder/300/200",
    description: "Organic greenhouse tomatoes"
  },
  {
    name: "Green Asparagus",
    image: "/api/placeholder/300/200",
    description: "Fresh harvested asparagus"
  },
  {
    name: "Greenhouse Plants",
    image: "/api/placeholder/300/200",
    description: "Sustainable indoor farming"
  },
  {
    name: "Fresh Produce",
    image: "/api/placeholder/300/200",
    description: "Locally grown vegetables"
  },
  {
    name: "Organic Collection",
    image: "/api/placeholder/300/200",
    description: "Premium organic selection"
  }
];

const CollaborationMotion = ({ className = "", duration = 30 }) => {
  return (
    <div className={`${className} w-full relative overflow-hidden`}>
      <motion.div
        className="flex"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {/* Double the images to create seamless loop */}
        {[...collaborationList, ...collaborationList].map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 px-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[300px] h-[200px] object-cover rounded-lg"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Collaborations = () => {
  return (
    <main className="w-full px-5 md:px-14 flex flex-col items-center justify-center max-w-screen-2xl mx-auto h-full pt-10 md:pt-6">
      <h2 className="text-2xl font-bold mb-8 self-start">Recent Collaborations & Innovations</h2>
      <CollaborationMotion />
    </main>
  );
};

export default Collaborations;