// src/__tests__/App.test.js
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;

  //before each test is run, this funtion runs ( makes a clean slate with the <App/>)
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render citySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("render number of events component", () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});

//integration tests

// describe("<App /> integration", () => {
//   test("renders a list of events matching the city selected by the user", async () => {
//     const user = userEvent.setup();
//     const AppComponent = render(<App />);
//     const AppDOM = AppComponent.container.firstChild;

//     const CitySearchDOM = AppDOM.querySelector("#city-search");
//     const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

//     await user.type(CitySearchInput, "Berlin");
//     const berlinSuggestionItem =
//       within(CitySearchDOM).queryByText("Berlin, Germany");
//     await user.click(berlinSuggestionItem);

//     const EventListDOM = AppDOM.querySelector("#event-list");
//     const allRenderedEventItems =
//       within(EventListDOM).queryAllByRole("listitem");

//     const allEvents = await getEvents();
//     const berlinEvents = allEvents.filter(
//       (event) => event.location === "Berlin, Germany"
//     );

//     expect(allRenderedEventItems.length).toBe(berlinEvents.length);

//     allRenderedEventItems.forEach((event) => {
//       expect(event.textContent).toContain("Berlin, Germany");
//     });
//   });
// });

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  //
  //
  //
  //exercise
  // test("user specifies the number of events to be rendered, and list updates accordingly", async () => {
  //   const user = userEvent.setup();
  //   const AppComponent = render(<App />);
  //   const AppDOM = AppComponent.container.firstChild;

  //   const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
  //   const NumberOfEventsInput =
  //     within(NumberOfEventsDOM).queryByRole("textbox");

  //   let numberOfEvents = 10;
  //   await user.type(
  //     NumberOfEventsInput,
  //     `{backspace}{backspace}${numberOfEvents}`
  //   );
  //   // const berlinSuggestionItem =
  //   // within(NumberOfEventsDOM).queryByText("Berlin, Germany");
  //   // await user.click(berlinSuggestionItem);

  //   const EventListDOM = AppDOM.querySelector("#event-list");
  //   const allRenderedEventItems =
  //     within(EventListDOM).queryAllByRole("listitem");

  //   // const allEvents = await getEvents();

  //   // for (let i = 0; i < numberOfEvents; i++) {
  //   //   const element = array[i];
  //   // }

  //   // const berlinEvents = allEvents.slice(0, numberOfEvents);

  //   expect(allRenderedEventItems.length).toEqual(numberOfEvents);

  //   // allRenderedEventItems.forEach((event) => {
  //   //   expect(event.textContent).toContain("Berlin, Germany");
  //   // });
  // });
  test("selected number of events by the user are rendered", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
    const NumberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole("textbox");

    await userEvent.type(NumberOfEventsInput, "{backspace}{backspace}10");

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");
    expect(allRenderedEventItems.length).toEqual(10);
  });
});
