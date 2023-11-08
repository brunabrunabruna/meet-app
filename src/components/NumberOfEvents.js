import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  // const [eventsNumber, setEventsNumber] = useState("32");

  const handleInputChanged = (event) => {
    const value = event.target.value;

    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "only positive number are valid";
      setErrorAlert(errorText);
    } else {
      setCurrentNOE(value);
      errorText = "";
      setErrorAlert(errorText);
    }
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
