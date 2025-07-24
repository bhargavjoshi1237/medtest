# Billing System Design Document

## Overview

The Billing System is a management interface for handling billing operations within the medical management project. It works with the existing schema (users, customers, products, schemes, orders, notifications) without creating new tables. The system provides billing views and operations for existing order data, following the established Laravel + Inertia + React architecture with Repository pattern.

## Architecture

### Backend Architecture (Laravel)
- **Models**: Uses existing Order, Customer, Product, Scheme, User, Notification models
- **Controllers**: OrderController following Resource controller pattern
- **Repositories**: OrderRepository extending BaseRepository (works with Order model)
- **Requests**: Form request classes for validation
- **Services**: Business logic layer for billing calculations and operations

### Frontend Architecture (React + Inertia)
- **Pages**: Billing management pages using Inertia.js
- **Components**: Reusable React components for billing UI
- **Layouts**: Consistent layout structure
- **Forms**: Form handling with validation

### Repository Pattern Implementation
- Extends existing BaseRepository for common CRUD operations
- Works with Order model and related entities
- Custom methods for billing-specific queries and calculations

## Components and Interfaces

### Backend Components

#### Existing Models Used
- **Order**: Main entity for billing operations
- **Customer**: Customer information for bills
- **Product**: Product details via order-product pivot
- **Scheme**: Discount calculations
- **User**: Track who manages billing operations
- **Notification**: Send billing-related notifications

#### Repository Interface
```php
interface RepositoryInterface extends BaseRepositoryInterface
{
    public function getOrdersForBilling(array $filters = []): Collection;
    public function calculateOrderTotal($orderId): array;
    public function updateOrderStatus($orderId, string $status): bool;
    public function getOrdersByCustomer($customerId): Collection;
    public function getOrdersByDateRange($start, $end): Collection;
    public function searchOrders(array $filters): Collection;
    public function applySchemeDiscounts($customerId): array;
    public function updateProductQuantity($productId, $quantity): bool;
    public function checkInventoryAlerts($productId): void;
    public function getCustomerOrderCount($customerId): int;
}

class Repository extends BaseRepository implements RepositoryInterface
{
    protected $model = Order::class;
    // Implementation using BaseRepository methods where applicable
    // Works with existing Order, Customer, Product, Scheme, Notification models
    // Handles inventory management and discount calculations
}
```

#### Controller
```php
class Controller extends Controller
{
    // Resource controller methods working with orders as bills
    - index() // List orders as bills with filtering
    - show() // Show order details as bill
    - update() // Update order status for billing
    - calculateTotal() // Calculate order totals with schemes
}
```

#### Request Classes
```php
class FilterRequest extends FormRequest
{
    // Validation for search/filter parameters
}

class UpdateStatusRequest extends FormRequest  
{
    // Validation for order status updates
}
```

### Frontend Components

#### Pages Structure
```
resources/js/Pages/Bills/
├── Index.jsx          // Orders listing as bills
├── Show.jsx           // Order details as bill view
└── Edit.jsx           // Update order status for billing
```

#### React Components
```
resources/js/Components/Bills/
├── BillCard.jsx       // Individual order display as bill
├── BillFilters.jsx    // Search and filter controls
├── BillStatus.jsx     // Order status display for billing
├── BillSummary.jsx    // Order totals with scheme calculations
└── BillDetails.jsx    // Order details formatted as bill
```

## Data Models

### Existing Tables Used
- **orders**: Main table for billing data
- **customers**: Customer information
- **products**: Product details
- **schemes**: Discount criteria
- **users**: User management
- **notifications**: Notification system
- **order_products**: Pivot table linking orders to products

### Key Relationships (Existing)
- **Order** belongsTo **User** (via created_by field - tracks who created the order)
- **Order** belongsTo **Customer** (via customer_id field - shows whose order this is)
- **Order** belongsToMany **Product** (via order_product pivot table with quantity field)
- **Product** hasMany **Notification** (via product_id field - for low stock alerts)
- **Scheme** applies to orders based on customer order count for discount calculations
- **Notification** belongsTo **Product** (for inventory alerts when quantity below alert_quantity)

## Error Handling

### Backend Error Handling
- Form request validation for all inputs
- Model validation for business rules
- Repository-level exception handling
- API response formatting for errors

### Frontend Error Handling
- Inertia.js error handling for form submissions
- React error boundaries for component errors
- User-friendly error messages
- Loading states and error recovery

## Testing Strategy

### Backend Testing
- Unit tests for Repository methods
- Feature tests for Controller endpoints
- Order model relationship tests
- Request validation tests

### Frontend Testing
- Component unit tests using Jest/React Testing Library
- Integration tests for page functionality
- Form validation tests
- User interaction tests

### Test Structure
```
tests/
├── Unit/
│   ├── RepositoryTest.php
│   └── OrderBillingTest.php
├── Feature/
│   ├── ControllerTest.php
│   └── BillingManagementTest.php
└── Frontend/
    ├── BillIndex.test.jsx
    ├── BillDetails.test.jsx
    └── BillFilters.test.jsx
```

## Integration Points

### Existing Schema Integration
- **Order**: Primary entity for billing operations (belongs to User via created_by, belongs to Customer via customer_id)
- **Customer**: Customer information for billing (has many Orders)
- **Product**: Product details via order_products pivot table (has many Notifications for inventory alerts)
- **Scheme**: Discount calculations based on customer order count (ordercount field determines minimum orders for discount)
- **User**: Track who created the order (has many Orders via created_by field)
- **Notification**: Inventory alerts when product quantity below alert_quantity (belongs to Product via product_id)

### Repository Pattern Integration
- Extends BaseRepository for common operations
- Works with existing Order model
- Follows established naming conventions
- Uses dependency injection for testability
- Implements consistent error handling patterns

## Business Logic

### Billing Calculations
- Calculate order subtotals from order_products pivot table with quantity
- Count customer's total orders to determine scheme discount eligibility
- Apply scheme discounts based on ordercount field (minimum orders required)
- Generate billing summaries with automatic discount application

### Inventory Management Integration
- Update product quantity when order is submitted
- Check if product quantity falls below alert_quantity threshold
- Create notifications via Notification model when inventory is low
- Link notifications to specific products via product_id

### Status Management
- Use existing order status for billing states
- Track order creation via created_by field (User relationship)
- Associate orders with customers via customer_id field
- Send inventory notifications when product stock is low