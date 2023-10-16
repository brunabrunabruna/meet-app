import { useState } from "react";
import { getEvents } from "./api";
import mockData from "./mock-data";

const Event = ({ event }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  return (
    <li>
      <div>{event.summary}</div>
      <div>{event.created}</div>
      <div>{event.location}</div>
      {/* details are hidden bu default */}
      {isDetailsOpen ? (
        <details open={true} className="detailsOpened">
          {event.description}
        </details>
      ) : (
        <details open={false} className="detailsClosed">
          {event.description}
        </details>
      )}

      <div>
        {isDetailsOpen ? (
          <button
            onClick={() => {
              setIsDetailsOpen(false);
            }}
          >
            hide details
          </button>
        ) : (
          <button
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
