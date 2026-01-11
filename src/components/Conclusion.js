import React from 'react';
import './Conclusion.css';

function Conclusion() {
  return (
    <div className="conclusion-section">
      <div className="conclusion-container">
        <div className="conclusion-divider">
          <div className="conclusion-divider-line"></div>
        </div>
        
        <div className="conclusion-card">
          <h2 className="conclusion-title">Why I Made This Site</h2>
          
          <div className="conclusion-content">
            <p className="conclusion-paragraph">
              After watching a video by Not Just Bikes, I realized that the life I had always considered normal wasn't normal at all.
            </p>
            
            <p className="conclusion-paragraph">
              Once that clicked, I couldn't unsee it. Every part of my day started to feel like evidence. The carpool traffic every morning. Buses that didn't show up after school. Skipping after-school activities because I had no way home. Not being able to hang out with friends because I couldn't drive. Not being able to go to the gym, the library, the grocery store, or even a coffee shop on my own. Not even being able to go for a run outside.
            </p>
            
            <p className="conclusion-paragraph">
              Everything in my day became a reminder that car-dependent suburbia was quietly stopping me from doing things I wanted to do.
            </p>
            
            <p className="conclusion-paragraph">
              I wanted to create a site that brought awareness to this issue in a different way. Not through statistics or lectures, but through interaction. Through small moments where people could recognize themselves and realize: this isn't normal.
            </p>
            
            <p className="conclusion-paragraph">
              Originally, the "Day In The Life" section was only about teenagers, because it was inspired by my own experience. But after talking to my neighbors, I expanded it. Their grandparents had recently moved from Taiwan and were struggling to adjust here, not because of language or culture, but because they were stuck at home. They couldn't drive. There was nowhere to walk to. In Taiwan, daily life had been full and social because things were close. Here, independence disappeared.
            </p>
            
            <p className="conclusion-paragraph">
              That made it clear this wasn't just about teens. It affects kids, elderly people, people with disabilities, low-income families—anyone who can't or shouldn't have to rely on a car to exist.
            </p>
            
            <p className="conclusion-paragraph">
              So if any part of this site feels familiar, you're not alone. You weren't imagining it. But the frustration, loss of independence, and limitations you felt aren't personal failures; they're design choices. And they aren't inevitable. Places can be built differently, designed for people, not for cars.
            </p>
            
            <p className="conclusion-final">
              It doesn't have to be people vs pavement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conclusion;
