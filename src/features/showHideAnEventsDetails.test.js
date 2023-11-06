import { render, waitFor, within } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  //
  //test 1
  //
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppComponent;
    given("the user opens the app", () => {
      AppComponent = render(<App />);
    });

    when(
      "the user receives a list of all events, or events of a specific city",
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(32);
        });
      }
    );

    then("the event elements are collapsed by default", () => {
      const AppDOM = AppComponent.container.firstChild;
      const details = AppDOM.querySelector(".details");
      expect(details).not.toBeInTheDocument();
    });
  });

  //
  //test 2
  //
  test("User can expand an event to see details.", ({ given, when, then }) => {
    let AppComponent;
    given("the user received a list of events", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    when("the user clicks on the event details button", async () => {
      const AppDOM = AppComponent.container.firstChild;

      const showDetailsButton = AppDOM.querySelector(".show-details");
      const user = userEvent.setup();
      await user.click(showDetailsButton);
    });

    then("the event details should expand", () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector(".detailsOpened");
      expect(details).toBeInTheDocument();
    });
  });

  //
  //test 3
  //
  test("User can collapse an event to hide details.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let button;
    given("the event details of a particular event are showing", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      //why do i need this piece of code?
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole("listitem");
        expect(eventList[0]).toBeTruthy();
      });

      const showDetailsButton = AppDOM.querySelector(".show-details");
      button = showDetailsButton;
      const user = userEvent.setup();
      await user.click(showDetailsButton);

      //   console.log(AppDOM);
      const details = AppDOM.querySelector(".detailsOpened");
      //   console.log(details);
      expect(details).toBeInTheDocument();
    });

    when("the user clicks on the hide details button", async () => {
      await userEvent.click(button);
    });

    then("the details for this event should be hidden", () => {
      const AppDOM = AppComponent.container.firstChild;
      const details = AppDOM.querySelector(".detailsOpened");
      expect(details).not.toBeInTheDocument();
    });
  });
});
