import React, { useState } from "react";
import { camelotKeyData } from "./camelotdata";
import "./camelot.css";

const CamelotKeyWheel = () => {
  const radius = 200; // Outer circle radius
  const innerRadius = 120; // Inner circle radius
  const minorRadius = 65; // Inner minor circle radius

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

  const handleMouseEnter = (event, key) => {
    const { clientX, clientY } = event;
    setTooltip({
      visible: true,
      x: clientX,
      y: clientY,
      data: key,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, data: null });
  };

  return (
    <div className="camelot-wheel-container">
      <svg
        width={radius * 2 + 50}
        height={radius * 2 + 50}
        viewBox={`-${radius + 25} -${radius + 25} ${radius * 2 + 50} ${radius * 2 + 50}`}
      >
        {camelotKeyData.map((key, index) => {
          const totalKeys = camelotKeyData.length / 2; // Keys per circle (12)
          const angle = (360 / totalKeys) * (index % totalKeys); // Angle for each key
          const isInner = key.type === "inner";

          // Determine radii based on type
          const startRadius = isInner ? minorRadius : innerRadius;
          const endRadius = isInner ? innerRadius : radius;

          const x1 = startRadius * Math.cos((angle * Math.PI) / 180);
          const y1 = startRadius * Math.sin((angle * Math.PI) / 180);
          const x2 = endRadius * Math.cos((angle * Math.PI) / 180);
          const y2 = endRadius * Math.sin((angle * Math.PI) / 180);
          const nextAngle = (360 / totalKeys) * ((index % totalKeys) + 1);
          const x3 = endRadius * Math.cos((nextAngle * Math.PI) / 180);
          const y3 = endRadius * Math.sin((nextAngle * Math.PI) / 180);
          const x4 = startRadius * Math.cos((nextAngle * Math.PI) / 180);
          const y4 = startRadius * Math.sin((nextAngle * Math.PI) / 180);

          return (
            <g key={key.id}>
              {/* Slice */}
              <path
                d={`M${x1},${y1} L${x2},${y2} A${endRadius},${endRadius} 0 0 1 ${x3},${y3} L${x4},${y4} A${startRadius},${startRadius} 0 0 0 ${x1},${y1}`}
                fill={key.color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={(e) => handleMouseEnter(e, key)}
                onMouseLeave={handleMouseLeave}
              />
              {/* Label */}
              <text
                x={(startRadius + endRadius) / 2 * Math.cos(((angle + nextAngle) / 2) * (Math.PI / 180))}
                y={(startRadius + endRadius) / 2 * Math.sin(((angle + nextAngle) / 2) * (Math.PI / 180))}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#000"
                fontSize="12"
              >
                {key.id}
              </text>
            </g>
          );
        })}
      </svg>
      {/* Tooltip */}
      {tooltip.visible && tooltip.data && (
        <div
          className="tooltip"
          style={{
            top: tooltip.y + 10,
            left: tooltip.x + 10,
          }}
        >
          <strong>{tooltip.data.label}</strong>
          <p>{`Key: ${tooltip.data.id}`}</p>
        </div>
      )}
    </div>
  );
};

export default CamelotKeyWheel;
