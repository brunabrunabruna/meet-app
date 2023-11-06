Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default.
        Given the user opens the app
        When the user receives a list of all events, or events of a specific city
        Then the event elements are collapsed by default

    Scenario: User can expand an event to see details.
        Given the user received a list of events
        When the user clicks on the event details button
        Then the event details should expand

    Scenario: User can collapse an event to hide details.
        Given the event details of a particular event are showing
        When the user clicks on the hide details button
        Then the details for this event should be hidden