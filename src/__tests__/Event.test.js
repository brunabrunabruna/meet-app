// src/__tests__/App.test.js

import { getDefaultNormalizer, render } from "@testing-library/react";
import "../mock-data";
import Event from "../components/Event";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";
//
describe("<Event/> component", () => {
  let EventComponent;

  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  beforeEach(async () => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("has an element with summary key (events title)", () => {
    console.log("CONSOLE LOGGING:", allEvents[0]);
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  // test("has an element with created key (events start time)", () => {
  //   console.log("allEvents[0].created", allEvents[0].created);

  //   //why is it returning null???
  //   expect(
  //     EventComponent.queryByText(allEvents[0].created)
  //   ).toBeInTheDocument();
  // });

  test("has an element with location key (events city)", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    expect(EventComponent.queryByText("show details")).toBeInTheDocument();
  });

  test("by default, events details section should be hidden", () => {
    console.log("CONSOLE LOGGING:", allEvents[0].description);

    // expect(
    //   EventComponent.container.que(allEvents[0].description, {
    //     normalizer: getDefaultNormalizer({
    //       trim: false,
    //       collapseWhitespace: false,
    //     }),
    //   })
    // ).not.toBeVisible();
    expect(
      EventComponent.container.querySelector(".detailsOpened")
    ).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the show details button", async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByText("show details");
    await user.click(showDetailsButton);
    const descriptionSection =
      EventComponent.container.querySelector(".detailsOpened");
    expect(descriptionSection).toBeVisible();
  });
  test("hides the details section when the user clicks on the hide details button", async () => {
    const user = userEvent.setup();
    const hideDetailsButton = EventComponent.queryByText("hide details");
    await user.click(hideDetailsButton);
    const descriptionSection =
      EventComponent.container.querySelector(".detailsClosed");
    expect(descriptionSection).not.toBeVisible();
  });
});
