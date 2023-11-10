import { useState } from "react";
import { getEvents } from "../api";
import mockData from "../mock-data";

const Event = ({ event }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  return (
    <li className="event">
      <div className="event-title">{event.summary}</div>
      <div>{event.created}</div>
      <div>{event.location}</div>
      {/* details are hidden bu default */}
      {isDetailsOpen ? (
        <details
          open={true}
          className="detailsOpened"
          style={{ listStyle: "none" }}
        >
          {event.description}
        </details>
      ) : (
        <details
          open={false}
          className="detailsClosed"
          style={{ listStyle: "none" }}
        >
          {event.description}
        </details>
      )}

      <div className="details-btn">
        {isDetailsOpen ? (
          <button
            className="hide-details"
            onClick={() => {
              setIsDetailsOpen(false);
            }}
          >
            hide details
          </button>
        ) : (
          <button
            className="show-details"
            onClick={() => {
              setIsDetailsOpen(true);
            }}
          >
            show details
          </button>
        )}
      </div>
    </li>
  );
};

export default Event;
