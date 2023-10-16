import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";

const App = () => {
  return (
    <div className="App">
      <EventList />
      <CitySearch />
      <NumberOfEvents />
    </div>
  );
};

export default App;
