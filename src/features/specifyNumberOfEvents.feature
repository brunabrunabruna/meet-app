Feature: Specify Number of Events
    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given user hasn’t specified a number of events
        When the user sees the list of events
        Then the user should see by default a list of 32 events

    Scenario: User can change the number of events displayed.
        Given the user sees the list of events
        When the user types a different number on the text box
        Then list of events displayed is updated to the new number
