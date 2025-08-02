import React, { useState, useEffect } from 'react';

export default function FadeOnly() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // kicks off fade immediately on mount
    requestAnimationFrame(() => {
      setVisible(false);
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Static gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(18,18,18,1) 40%, rgba(18,18,18,0.75) 90%)'
        }}
      />

      {/* 2) Black overlay with transition */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease-out' // ← adjust 0.8s to whatever you need
        }}
      />
    </div>
  );
}
