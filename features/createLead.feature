//This is the business-readable BDD scenario.

Feature: Life Insurance Lead Generation in Salesforce

  Background:
    Given I am logged into Salesforce as a sales agent

  Scenario: Create a Term Life Insurance Lead successfully
    Given I navigate to the Leads module
    When I click on New Lead
    And I create a lead using test data
    And I save the lead
    Then the lead should be created successfully
    And I should see the lead first name
    And I should see the insurance type