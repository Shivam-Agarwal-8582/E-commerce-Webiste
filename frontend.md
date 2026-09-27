I want you to build the complete frontend for a MERN stack e-commerce website for my physical shop.

TECHNOLOGY:

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Redux Toolkit
- Axios
- React Icons
- React Hot Toast or another clean toast notification library

Do NOT build the backend in this prompt.

The frontend must communicate with a REST API backend.

PROJECT PURPOSE:

I own a physical shop and I want to list all products available in my shop on this website.

Customers should be able to:

- Create an account
- Sign in
- Sign out
- Browse products
- Search products
- Filter products
- View product details
- Add products to cart
- Update cart quantities
- Remove products from cart
- Add/select delivery address
- Checkout
- Make payment
- Place orders
- View order history
- View individual order details

There must also be an ADMIN DASHBOARD.

ADMIN FEATURES:

The admin should be able to:

- Sign in as admin
- Add products
- Edit products
- Delete products
- Change product prices
- Change product stock/quantity
- Upload multiple product images
- Add/edit product descriptions
- Add categories
- View all products
- Search products
- View all customer orders
- View order details
- Update order status
- View registered users

--------------------------------------------
DESIGN REQUIREMENTS
--------------------------------------------

Create a modern, professional and responsive e-commerce design.

The website should work properly on:

- Desktop
- Tablet
- Mobile

Use a clean layout similar to modern online shopping websites.

Create:

1. Navbar
2. Logo area
3. Search bar
4. Categories navigation
5. Shopping cart icon with item count
6. User/account dropdown
7. Sign in button when logged out
8. Footer
9. Loading skeletons
10. Toast notifications
11. Empty states
12. Error states

--------------------------------------------
PAGES
--------------------------------------------

Create the following pages:

PUBLIC:

/
Homepage

/products
All products page

/products/:id
Product details page

/search
Search results

/category/:category
Category products


AUTH:

/login
Login page

/register
Register page


CUSTOMER:

/cart
Cart page

/checkout
Checkout page

/address
Address management page

/payment
Payment page

/order-success
Order successful page

/my-orders
Customer order history

/my-orders/:id
Individual order details

/profile
User profile page


ADMIN:

/admin
Admin dashboard

/admin/products
Product management

/admin/products/add
Add product

/admin/products/edit/:id
Edit product

/admin/orders
All orders

/admin/orders/:id
Admin order details

/admin/users
Users management

/admin/categories
Category management


--------------------------------------------
HOMEPAGE
--------------------------------------------

Create:

Hero section

Featured products

New products

Popular products

Categories section

Offers/discount section if offers exist

Product cards should display:

- Product image
- Product name
- Price
- Discount price if available
- Category
- Stock status
- Add to cart button
- View details button

--------------------------------------------
PRODUCT DETAILS PAGE
--------------------------------------------

Display:

Product name

Multiple product images

Main image viewer

Thumbnail images

Price

Discount price

Description

Category

Stock available

Quantity selector

Add to cart button

Buy now button

Related products

If product stock is 0, disable Add to Cart and show:

"Out of Stock"

--------------------------------------------
CART
--------------------------------------------

Cart page must display:

Product image

Product name

Price

Quantity

Increase quantity

Decrease quantity

Remove product

Subtotal

Delivery charges

Total amount

Proceed to Checkout button


Cart data should be managed using Redux Toolkit.

For authenticated customers, support syncing cart with backend.

--------------------------------------------
AUTHENTICATION
--------------------------------------------

Create authentication using Redux Toolkit.

Store:

user
token
role
isAuthenticated

Create:

ProtectedRoute

AdminRoute

Only authenticated customers can access checkout/orders/profile.

Only users where:

role === "admin"

can access /admin routes.

Handle token expiration gracefully.

--------------------------------------------
ADDRESS
--------------------------------------------

Create address management.

Address fields:

Full Name
Phone Number
House / Building Number
Street / Area
Landmark
City
State
PIN Code
Country

Allow customers to:

Add address

Edit address

Delete address

Set default address

Select address during checkout

--------------------------------------------
CHECKOUT
--------------------------------------------

Checkout flow:

Cart
→ Address
→ Order Summary
→ Payment
→ Order Confirmation


Checkout page should display:

Delivery address

Products

Product quantities

Subtotal

Shipping cost

Discount

Grand total

Payment method

Place Order button

--------------------------------------------
PAYMENT
--------------------------------------------

Prepare frontend integration for Razorpay.

Backend should create Razorpay orders.

Frontend should receive:

razorpayOrderId
amount
currency
key

Then open Razorpay Checkout.

After payment success send:

razorpay_payment_id
razorpay_order_id
razorpay_signature

to backend for verification.

Do NOT expose payment secrets on frontend.

Support:

Online payment
Cash on Delivery

--------------------------------------------
ORDERS
--------------------------------------------

My Orders page must display:

Order ID
Order date
Order status
Payment status
Total
Products preview
View Details button

Order details page should display:

Order number

Customer information

Delivery address

Products

Quantity

Price

Order subtotal

Shipping amount

Grand total

Payment method

Payment status

Order status

Created date

Order timeline


Order statuses:

Pending
Confirmed
Processing
Shipped
Out for Delivery
Delivered
Cancelled


--------------------------------------------
ADMIN DASHBOARD
--------------------------------------------

Create a professional sidebar dashboard.

Sidebar:

Dashboard
Products
Add Product
Categories
Orders
Users
Logout

Dashboard cards:

Total Products
Total Orders
Total Customers
Total Sales
Pending Orders


Recent orders table should display:

Order ID
Customer
Date
Amount
Payment
Status
Action


--------------------------------------------
ADMIN PRODUCT MANAGEMENT
--------------------------------------------

Display table/grid containing:

Product image
Name
Category
Price
Stock
Status
Created Date
Edit
Delete

Provide search.

Provide category filter.

Provide stock filter.


ADD PRODUCT FORM:

Product Name

Product Description

Price

Discount Price

Category

Stock Quantity

SKU

Brand

Multiple Product Images

Featured Product checkbox

Active checkbox


Preview uploaded images before submitting.

--------------------------------------------
EDIT PRODUCT
--------------------------------------------

Admin should be able to modify:

Name
Description
Price
Discount price
Stock
Category
Brand
Images
Status
Featured status

Admin can remove old images and upload new images.

--------------------------------------------
API STRUCTURE
--------------------------------------------

Create an Axios instance:

src/api/axios.js

Base URL should come from:

VITE_API_URL


Attach JWT automatically:

Authorization: Bearer TOKEN


Create API service files:

src/services/authService.js
src/services/productService.js
src/services/cartService.js
src/services/orderService.js
src/services/addressService.js
src/services/adminService.js


--------------------------------------------
REDUX STRUCTURE
--------------------------------------------

Create:

src/store/store.js

src/features/auth/authSlice.js
src/features/cart/cartSlice.js
src/features/products/productSlice.js
src/features/orders/orderSlice.js


--------------------------------------------
COMPONENT STRUCTURE
--------------------------------------------

Use reusable components.

Create something similar to:

src/
  api/
  assets/
  components/
      common/
      layout/
      product/
      cart/
      admin/
  pages/
      auth/
      customer/
      admin/
  features/
  services/
  store/
  routes/
  utils/


Components:

Navbar
Footer
ProductCard
ProductGrid
ProductImageGallery
SearchBar
CategoryMenu
QuantitySelector
CartItem
AddressCard
OrderCard
OrderStatusBadge
Loader
Skeleton
Modal
ConfirmationModal
Pagination
ProtectedRoute
AdminRoute


--------------------------------------------
IMPORTANT
--------------------------------------------

Do not use dummy logic once API integration is required.

Create clean and reusable React code.

Use async/await.

Handle API errors.

Handle loading states.

Show user friendly error messages.

Keep components small.

Use environment variables.

Do not expose API secrets.

Generate the project file-by-file.

First show me the complete folder structure.

Then generate:

1. package.json dependencies
2. React app setup
3. routing
4. Redux store
5. authentication
6. layout
7. customer pages
8. cart
9. checkout
10. payment integration
11. order pages
12. admin dashboard
13. admin product management
14. API services

Make the application production-oriented rather than just a simple tutorial project.