# Billing System Design Document

## Overview

The Billing System is a management interface for handling billing operations within the medical management project. It works with the existing schema (users, customers, products, schemes, orders, notifications) without creating new tables. The system provides billing views and operations for existing order data, following the established Laravel + Inertia + React architecture with Repository pattern.

## Architecture

### Backend Architecture (Laravel)
- **Models**: Uses existing Order, Customer, Product, Scheme, User, Notification models (all with UUID primary keys)
- **Controllers**: OrderController (existing resource controller for billing operations)
- **Repositories**: OrderRepository extending existing BaseRepository (works with Order model)
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

#### Existing Models Used (All with UUID Primary Keys)
- **Order**: Main entity for billing operations (requires boot method and keyType = 'string')
- **Customer**: Customer information for bills (requires boot method and keyType = 'string')
- **Product**: Product details with inventory management (requires boot method and keyType = 'string')
- **Scheme**: Discount calculations based on order count (requires boot method and keyType = 'string')
- **User**: Track who created orders (requires boot method and keyType = 'string')
- **Notification**: Send billing-related notifications (requires boot method and keyType = 'string')

#### OrderRepository Interface
```php
interface OrderRepositoryInterface extends RepositoryInterface
{
    public function getOrdersForBilling(array $filters = []): Collection;
    public function calculateOrderTotal(string $orderId): array;
    public function updateOrderStatus(string $orderId, string $status): bool;
    public function getOrdersByCustomer(string $customerId): Collection;
    public function getOrdersByDateRange($start, $end): Collection;
    public function searchOrders(array $filters): Collection;
    public function applySchemeDiscounts(string $customerId): array;
    public function updateProductQuantity(string $productId, int $quantity): bool;
    public function checkInventoryAlerts(string $productId): void;
    public function getCustomerOrderCount(string $customerId): int;
}

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
{
    // Uses existing BaseRepository methods
    // Works with UUID-based Order, Customer, Product, Scheme, Notification models
    // Handles inventory management and discount calculations
}
```

#### OrderController (Existing)
```php
class OrderController extends Controller
{
    // Existing resource controller methods enhanced for billing
    - index() // List orders as bills with filtering
    - show(Order $order) // Show order details as bill (UUID route model binding)
    - store(Request $request) // Create new order
    - update(Request $request, Order $order) // Update order status for billing
    - destroy(Order $order) // Cancel order
    - calculateTotal() // Calculate order totals with schemes
}
```

#### Request Classes
```php
class OrderFilterRequest extends FormRequest
{
    // Validation for search/filter parameters (UUID validation for IDs)
}

class UpdateOrderStatusRequest extends FormRequest  
{
    // Validation for order status updates (UUID validation for order ID)
}

class StoreOrderRequest extends FormRequest
{
    // Validation for order creation (UUID validation for customer_id, product_ids)
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

### Existing Tables Used (All with UUID Primary Keys)
- **orders**: Main table for billing data (id: UUID, customer_id: UUID, created_by: UUID)
- **customers**: Customer information (id: UUID)
- **products**: Product details with inventory (id: UUID, quantity: int, alert_quantity: int)
- **schemes**: Discount criteria (id: UUID, order_count: int, discount: decimal)
- **users**: User management (id: UUID)
- **notifications**: Notification system (id: UUID, product_id: UUID)
- **orders_products**: Pivot table linking orders to products (order_id: UUID, product_id: UUID, quantity: int)

### Key Relationships (UUID-based)
- **Order** belongsTo **User** (via created_by UUID field - tracks who created the order)
- **Order** belongsTo **Customer** (via customer_id UUID field - shows whose order this is)
- **Order** belongsToMany **Product** (via orders_products pivot table with quantity field, using UUID keys)
- **Product** hasMany **Notification** (via product_id UUID field - for low stock alerts)
- **Scheme** applies to orders based on customer order count (order_count field) for discount calculations
- **Notification** belongsTo **Product** (via product_id UUID field for inventory alerts when quantity below alert_quantity)
- **Customer** hasMany **Order** (via customer_id UUID field)
- **User** hasMany **Order** (via created_by UUID field)

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