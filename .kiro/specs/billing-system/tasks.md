# Implementation Plan

- [x] 1. Set up model relationships and UUID implementation
  - Add boot() method and keyType = 'string' to all existing models (Order, Customer, Product, Scheme, User, Notification)
  - Define UUID-based relationships in existing models (created_by, customer_id, product_id fields)
  - Ensure orders_products pivot table structure supports billing calculations with UUID keys
  - Add missing attributes for inventory management (alert_quantity in products, order_count in schemes)
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [ ] 2. Create OrderRepository extending existing BaseRepository
  - Create OrderRepositoryInterface extending existing RepositoryInterface with billing-specific methods
  - Implement OrderRepository class extending existing BaseRepository working with Order model
  - Add UUID-aware methods for order filtering, customer lookup, and date range queries
  - Implement inventory management methods for product quantity updates and alerts
  - _Requirements: 3.1, 3.2, 3.4_

- [ ] 3. Implement billing calculation logic
  - Create service class for calculating order totals from order_products pivot
  - Implement scheme discount application logic using existing Scheme model
  - Add methods for subtotal, discount, and final total calculations
  - Write unit tests for calculation logic
  - _Requirements: 1.2, 1.4_

- [x] 4. Create form request validation classes with UUID support
  - Implement OrderFilterRequest for filtering and search parameters with UUID validation
  - Create UpdateOrderStatusRequest for order status updates with UUID validation
  - Add StoreOrderRequest for order creation with UUID validation for customer_id and product_ids
  - Add validation rules following established patterns with UUID format validation
  - Write tests for request validation including UUID format checks
  - _Requirements: 3.4_

- [ ] 5. Enhance existing OrderController for billing operations
  - Extend existing OrderController with billing-specific functionality
  - Implement index method for listing orders as bills with filtering (UUID-aware)
  - Enhance show method for displaying order details as bill view with route model binding
  - Update store and update methods for inventory management and discount calculations
  - Add calculateTotal method for scheme-based discount calculations
  - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3_

- [ ] 6. Implement notification system integration
  - Add notification triggers for order status changes in billing context
  - Use existing Notification model to send billing-related notifications
  - Create notification templates for billing status updates
  - _Requirements: 2.3_

- [ ] 7. Create React components for billing interface
  - Build BillCard component for displaying individual orders as bills
  - Create BillFilters component for search and filtering controls
  - Implement BillStatus component for order status display
  - Add BillSummary component for totals with scheme calculations
  - _Requirements: 3.1, 3.3_

- [ ] 8. Build billing management pages
  - Create Index page for listing orders as bills with filtering
  - Implement Show page for order details formatted as bill view
  - Add Edit page for updating order status in billing context
  - Integrate with Inertia.js for seamless navigation
  - _Requirements: 2.4, 3.1, 3.2, 3.3_

- [ ] 9. Implement search and filtering functionality
  - Add backend filtering logic in repository for customer, date range, status
  - Create frontend filter controls with form handling
  - Implement search by order number functionality
  - Add pagination for large result sets
  - _Requirements: 3.2_

- [ ] 10. Add comprehensive testing suite
  - Write unit tests for repository methods and calculation logic
  - Create feature tests for controller endpoints
  - Add React component tests for billing interface
  - Implement integration tests for complete billing workflows
  - _Requirements: All requirements validation_

- [ ] 11. Integrate with existing project structure
  - Ensure billing routes follow established routing patterns
  - Add billing navigation to existing layout structure
  - Integrate with existing authentication and authorization
  - Test integration with all existing models and relationships
  - _Requirements: 3.4_