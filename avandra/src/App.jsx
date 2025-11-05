import { useState } from "react";

function App() {
  const [trips, setTrips] = useState([]);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const hasTrips = trips.length > 0;

  function handleStartCreate() {
    setIsCreatingTrip(true);
  }

  function handleCancelCreate() {
    setIsCreatingTrip(false);
    setFormData({
      name: "",
      destination: "",
      startDate: "",
      endDate: "",
      notes: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCreateTrip(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      // You could swap this for a nicer inline validation later
      alert("Please add a trip name.");
      return;
    }

    const newTrip = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: formData.name.trim(),
      destination: formData.destination.trim(),
      startDate: formData.startDate || null,
      endDate: formData.endDate || null,
      notes: formData.notes.trim(),
      createdAt: new Date().toISOString(),
    };

    setTrips((prev) => [...prev, newTrip]);

    // Reset form and hide it
    setFormData({
      name: "",
      destination: "",
      startDate: "",
      endDate: "",
      notes: "",
    });
    setIsCreatingTrip(false);
  }

  return (
    <div className="app-root">
      <header className="app-header">
  <div className="brand">
    <img
      src="/AvandralogoA.png"
      alt="Avandra logo"
      className="brand-logo"
    />
    <div className="brand-text">
      <h1>Avandra</h1>
      <p className="brand-tagline">Your journeys, organised beautifully.</p>
    </div>
  </div>

  <button
    className="primary-btn"
    type="button"
    onClick={handleStartCreate}
  >
    New trip
  </button>
</header>


      <main className="app-main">
        <section className="hero-panel">
          <h2>Plan every detail of your next adventure</h2>
          <p>
            Keep flights, hotels, activities and notes in one clean itinerary you can
            update on the go or print before you travel.
          </p>

          {hasTrips && (
            <p className="hero-hint">
              You currently have{" "}
              <strong>{trips.length === 1 ? "1 active trip" : `${trips.length} trips`}</strong>.
              Select one to add events in the next step.
            </p>
          )}
        </section>

        <section className="content-panel">
          {!hasTrips && !isCreatingTrip && (
            <div className="empty-state">
              <h3>Start your first trip</h3>
              <p>
                Add your first trip to see how Avandra keeps everything in one place -
                dates, destinations and notes ready for the itinerary view.
              </p>
              <button
                className="primary-btn primary-btn-lg"
                type="button"
                onClick={handleStartCreate}
              >
                Create your first trip
              </button>
            </div>
          )}

          {isCreatingTrip && (
            <form className="trip-form" onSubmit={handleCreateTrip}>
              <div className="panel-header">
                <div>
                  <h3>Create a new trip</h3>
                  <p>Give your trip a name and some basic details to get started.</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="trip-name">Trip name *</label>
                  <input
                    id="trip-name"
                    name="name"
                    type="text"
                    className="subtle-input"
                    placeholder="Summer in Barcelona"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="trip-destination">Destination</label>
                  <input
                    id="trip-destination"
                    name="destination"
                    type="text"
                    className="subtle-input"
                    placeholder="Barcelona, Spain"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="trip-startDate">Start date</label>
                  <input
                    id="trip-startDate"
                    name="startDate"
                    type="date"
                    className="subtle-input"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="trip-endDate">End date</label>
                  <input
                    id="trip-endDate"
                    name="endDate"
                    type="date"
                    className="subtle-input"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field form-field-full">
                  <label htmlFor="trip-notes">Notes</label>
                  <textarea
                    id="trip-notes"
                    name="notes"
                    className="subtle-input subtle-textarea"
                    placeholder="Key details, booking references or ideas you do not want to forget."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="primary-btn primary-btn-lg" type="submit">
                  Save trip
                </button>
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={handleCancelCreate}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {hasTrips && !isCreatingTrip && (
            <div className="trip-list-wrapper">
              <div className="panel-header">
                <div>
                  <h3>Your trips</h3>
                  <p>Choose a trip to manage its itinerary in the next stage.</p>
                </div>
                <span className="pill-count">
                  {trips.length} {trips.length === 1 ? "trip" : "trips"}
                </span>
              </div>

              <ul className="trip-list">
                {trips.map((trip) => (
                  <li key={trip.id} className="trip-card">
                    <div className="trip-card-main">
                      <h4>{trip.name}</h4>
                      {trip.destination && (
                        <p className="trip-destination">{trip.destination}</p>
                      )}
                    </div>

                    <div className="trip-card-meta">
                      {(trip.startDate || trip.endDate) && (
                        <p className="trip-dates">
                          {trip.startDate ? trip.startDate : "?"} -{" "}
                          {trip.endDate ? trip.endDate : "?"}
                        </p>
                      )}
                      {trip.notes && (
                        <p className="trip-notes-preview">
                          {trip.notes.length > 80
                            ? `${trip.notes.slice(0, 80)}…`
                            : trip.notes}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
