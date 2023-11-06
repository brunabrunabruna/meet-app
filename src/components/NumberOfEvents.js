import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  // const [eventsNumber, setEventsNumber] = useState("32");

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <input
        data-testid="event-number-imput"
        type="text"
        className="event-number"
        // placeholder="32"
        defaultValue="32"
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
