import { render, waitFor, within } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  //
  //test 1
  //
  test("When user hasn’t specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let eventList;
    given("user hasn’t specified a number of events", () => {
      AppComponent = render(<App />);
    });

    when("the user sees the list of events", async () => {
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        eventList = within(AppDOM).queryAllByRole("listitem");
        console.log(eventList);

        expect(eventList[0]).toBeTruthy();
      });
    });

    then(/^the user should see by default a list of (\d+) events$/, (arg0) => {
      expect(eventList.length).toEqual(32);
    });
  });

  //
  //test 2
  //
  test("User can change the number of events displayed.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let eventList;
    given("the user sees the list of events", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        eventList = within(AppDOM).queryAllByRole("listitem");
        console.log(eventList);

        expect(eventList[0]).toBeTruthy();
      });
    });

    when("the user types a different number on the text box", async () => {
      const button = AppComponent.queryByTestId("event-number-imput");
      const user = userEvent.setup();
      await user.type(button, "{backspace}{backspace}3");
    });

    then("list of events displayed is updated to the new number", () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventsNewLength = within(AppDOM).queryAllByRole("listitem");
      expect(eventsNewLength.length).toBe(3);
    });
  });
});
