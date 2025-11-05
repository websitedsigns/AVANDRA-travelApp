import { useState } from "react";

function App() {
  // For now, we just keep a dummy bit of state we will expand later
  const [hasTrips] = useState(false);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
  <img
    src="AvandralogoA.png"
    alt="Avandra Logo"
    className="brand-logo"
  />
  <div className="brand-text">
    <h1>Avandra</h1>
    <p className="brand-tagline">Your journeys, organised beautifully.</p>
  </div>
</div>


        <button className="primary-btn" type="button">
          New trip
        </button>
      </header>

      <main className="app-main">
        <section className="hero-panel">
          <h2>Plan every detail of your next adventure</h2>
          <p>
            Keep flights, hotels, activities and notes in one clean itinerary that works online
            and on paper.
          </p>
        </section>

        <section className="content-panel">
          {!hasTrips ? (
            <div className="empty-state">
              <h3>Start your first trip</h3>
              <p>
                You do not have any trips yet. Soon this space will show your upcoming adventures,
                with every event neatly in order.
              </p>
              <button className="primary-btn primary-btn-lg" type="button">
                Create your first trip
              </button>
            </div>
          ) : (
            <div>
              {/* Later: list of trips and selected trip detail */}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
