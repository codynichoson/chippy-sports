// HomePage.js

import React from "react";
import "./HomePage.css"; // Import your CSS file for styling

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="column left-column">
        <div className="game-info clickable-element">
          <div className="team-logo">
            <img src="/swans.png" alt="Sydney Swans" />
          </div>
          <div className="team-score">
            <p>76</p>
          </div>
          <div className="team-score">
            <p>82</p>
          </div>
          <div className="team-logo">
            <img src="/richmond.png" alt="Richmond Tigers" />
          </div>
        </div>
        <div className="clickable-element">
          <p>Left Element 2</p>
        </div>
      </div>

      <div className="column center-column">
        <div className="clickable-element big-element">
          <img src="path/to/your/photo.jpg" alt="Your Photo" />
          <h2>Headline</h2>
        </div>
      </div>

      <div className="column right-column">
        <div className="clickable-element">
          <p>Right Element 1</p>
        </div>
        <div className="clickable-element">
          <p>Right Element 2</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
