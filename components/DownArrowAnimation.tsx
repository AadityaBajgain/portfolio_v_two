"use client"
import React from 'react';
import { motion } from 'framer-motion';

const DownArrowAnimation: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 10 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      style={{
        width: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '15px solid #0f766e',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
      }}
    />
  );
};

export default DownArrowAnimation;
