import React from 'react';

const SectionDivider = () => {
  // Inline style for the gradient divider
  const dividerStyle = {
    width: '80%', // Reduced width to create space on the sides
    height: '4px', // Adjust the height as needed
    background: 'linear-gradient(90deg, #12c2e9, #c471ed, #f64f59)', // Gradient background
    margin: '40px auto', // Auto centers the divider and adds top-bottom margin
  };

  return <div style={dividerStyle}></div>;
};

export default SectionDivider;
