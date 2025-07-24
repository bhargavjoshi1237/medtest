# Requirements Document

## Introduction

The Billing System is a management tool that handles billing operations within the medical management project. It works with the existing schema (users, customers, products, schemes, orders, notifications) to manage billing processes for orders placed by customers.

## Requirements

### Requirement 1

**User Story:** As a user, I want to generate bills for customer orders, so that I can create billing records for completed orders.

#### Acceptance Criteria

1. WHEN an order exists THEN the system SHALL allow generation of a bill with order details
2. WHEN generating a bill THEN the system SHALL include customer information, products from the order, and calculated totals
3. WHEN a bill is generated THEN the system SHALL assign a unique bill number and creation timestamp
4. WHEN applicable schemes exist THEN the system SHALL apply scheme discounts to the bill total

### Requirement 2

**User Story:** as a user i should be able to manage quentity of the product as an inventory management.

#### Acceptance Criteria

1. when product is added to a order and the order propery gets submitted then the system shall update the product quantity.
2. WHEN product is below the alertquontity (a field for that product in that table) THEN the system SHALL send notifications using the notification table
3. WHEN required user can update quentity, price, and name of the product THEN the system SHALL update the product details accordingly


### Requirement 3

**User Story:** As a user, when finalisign the order, system should be able to calculate the discount properly

#### Acceptance Criteria

1. WHEN finalising the order, extract all the orders of that selected customer and compare that to scheme table and decide the discount
2. WHEN the scheme table includes ordercount and discount, THEN the system SHALL apply the discount to the bill total based on the customers order count
3. WHEN discound should automaticly be shown and then deduct from the total payable
4. sheme table contains ordercount and discount, systme should deside using the ordercound as minimum ordercount to apply the discount