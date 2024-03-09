// HomePage.js

import React from "react";
import "../styles/HomePage.css"; // Import your CSS file for styling

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="column left-column">
        <div className="game-info clickable-element"></div>
        <div className="clickable-element"></div>
      </div>

      <div className="column center-column">
        <div className="clickable-element big-element">
          <h2>Headline</h2>
        </div>
      </div>

      <div className="column right-column">
        <div className="clickable-element"></div>
        <div className="clickable-element"></div>
      </div>
    </div>
  );
}

export default HomePage;
