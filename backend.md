Build a complete production-oriented backend REST API for my MERN stack e-commerce website.

TECH STACK:

Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Cloudinary
Multer
Razorpay
dotenv
cors
express-validator or Joi/Zod
cookie-parser if needed

Use ES Modules.

PROJECT PURPOSE:

I own a physical shop and want customers to buy products available in my shop.

There are two roles:

customer
admin


CUSTOMERS CAN:

Register
Login
Logout
View products
Search products
Filter products
Add products to cart
Manage cart
Manage addresses
Checkout
Pay online
Use Cash on Delivery
Place orders
View their orders
View order details


ADMINS CAN:

Login
Add products
Edit products
Delete products
Upload product images
Remove product images
Change product price
Change stock
Change product information
Add descriptions
Manage categories
View all orders
Update order status
View customers


----------------------------------------
FOLDER STRUCTURE
----------------------------------------

Use clean architecture similar to:

src/
  config/
      db.js
      cloudinary.js
  controllers/
      authController.js
      productController.js
      cartController.js
      orderController.js
      addressController.js
      categoryController.js
      adminController.js
      paymentController.js
  middleware/
      authMiddleware.js
      adminMiddleware.js
      errorMiddleware.js
      uploadMiddleware.js
      validationMiddleware.js
  models/
      User.js
      Product.js
      Cart.js
      Order.js
      Address.js
      Category.js
  routes/
      authRoutes.js
      productRoutes.js
      cartRoutes.js
      orderRoutes.js
      addressRoutes.js
      categoryRoutes.js
      adminRoutes.js
      paymentRoutes.js
  services/
  utils/
  validators/
  app.js
  server.js


----------------------------------------
AUTHENTICATION
----------------------------------------

Create:

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me


User fields:

name
email
password
phone
role
isActive
createdAt
updatedAt


Allowed roles:

customer
admin


Password requirements:

minimum 8 characters.

Hash passwords using bcrypt.

Never return password through API.

Use JWT authentication.

JWT payload:

userId
role


Create middleware:

protect

adminOnly


protect verifies token.

adminOnly allows access only when:

req.user.role === "admin"


----------------------------------------
PRODUCT
----------------------------------------

Product fields:

name
slug
description
shortDescription

price
discountPrice

category
brand

stock
sku

images

featured
isActive

createdAt
updatedAt


Image structure:

{
  publicId: String,
  url: String
}


API:

GET /api/products

GET /api/products/:id

GET /api/products/slug/:slug

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id


POST, PUT and DELETE must require ADMIN.


GET /api/products should support:

?page=1

?limit=20

?search=milk

?category=groceries

?minPrice=10

?maxPrice=1000

?sort=price-low

?inStock=true

?featured=true


Implement pagination.

Return:

{
   success: true,
   products: [],
   page: 1,
   pages: 5,
   total: 100
}


----------------------------------------
PRODUCT IMAGE UPLOAD
----------------------------------------

Use:

Multer
Cloudinary


Admin can upload multiple images.

Maximum images per product:

6


Allow:

jpg
jpeg
png
webp


Validate file size and file type.

Store only Cloudinary:

publicId
url


When image is removed:

also delete it from Cloudinary.


----------------------------------------
CATEGORY
----------------------------------------

Category fields:

name
slug
description
image
isActive


API:

GET /api/categories

POST /api/categories

PUT /api/categories/:id

DELETE /api/categories/:id


Modification endpoints must require admin role.


----------------------------------------
CART
----------------------------------------

Cart belongs to one user.

Cart structure:

user

items: [
 {
   product,
   quantity
 }
]


Endpoints:

GET /api/cart

POST /api/cart

PUT /api/cart/:productId

DELETE /api/cart/:productId

DELETE /api/cart


POST request:

{
   productId,
   quantity
}


Validate:

Product exists

Product active

Quantity > 0

Requested quantity <= product stock


Never trust product price from frontend.

Always get price from database.


----------------------------------------
ADDRESS
----------------------------------------

Address model:

user
fullName
phone
addressLine1
addressLine2
landmark
city
state
postalCode
country
isDefault


Endpoints:

GET /api/addresses

POST /api/addresses

PUT /api/addresses/:id

DELETE /api/addresses/:id

PATCH /api/addresses/:id/default


A user must only be able to access their own addresses.


----------------------------------------
ORDER
----------------------------------------

Create an Order model.


Order fields:

user

orderNumber

items: [
 {
   product,
   name,
   image,
   quantity,
   price
 }
]

shippingAddress

subtotal

shippingCharge

discount

total

paymentMethod

paymentStatus

orderStatus

razorpayOrderId

razorpayPaymentId

createdAt

updatedAt


paymentMethod:

COD
RAZORPAY


paymentStatus:

Pending
Paid
Failed
Refunded


orderStatus:

Pending
Confirmed
Processing
Shipped
OutForDelivery
Delivered
Cancelled


IMPORTANT:

Store copies of product:

name
image
price

inside the order.

This ensures future product price changes don't alter old orders.


----------------------------------------
CREATE ORDER
----------------------------------------

POST /api/orders


When creating an order:

1. Verify authenticated user
2. Read their cart
3. Get current products from database
4. Verify product availability
5. Verify current prices
6. Calculate totals on backend
7. Validate stock
8. Get selected address
9. Create order
10. Deduct stock only at the correct stage
11. Clear cart after successful order creation/payment according to payment method


Never trust:

price
subtotal
total
discount

coming from frontend.


Calculate everything on backend.


----------------------------------------
ORDER ROUTES
----------------------------------------

POST /api/orders

GET /api/orders/my-orders

GET /api/orders/:id

PATCH /api/orders/:id/cancel


Admin:

GET /api/admin/orders

GET /api/admin/orders/:id

PATCH /api/admin/orders/:id/status


Customers can only access their own orders.

Admins can access all orders.


----------------------------------------
RAZORPAY
----------------------------------------

Integrate Razorpay securely.

Environment variables:

RAZORPAY_KEY_ID

RAZORPAY_KEY_SECRET


Endpoints:

POST /api/payment/create-order

POST /api/payment/verify


Create Razorpay order on backend.


Payment verification:

Verify:

razorpay_order_id

razorpay_payment_id

razorpay_signature


using HMAC SHA256.


Never trust frontend confirmation alone.


Only mark:

paymentStatus = "Paid"

after server-side signature verification.


Implement idempotency protection so repeated verification requests don't duplicate orders or payments.


----------------------------------------
ADMIN
----------------------------------------

Create:

GET /api/admin/dashboard


Response:

{
   totalProducts,
   totalOrders,
   totalCustomers,
   totalSales,
   pendingOrders,
   lowStockProducts
}


Routes:

GET /api/admin/products

POST /api/admin/products

PUT /api/admin/products/:id

DELETE /api/admin/products/:id


GET /api/admin/orders

PATCH /api/admin/orders/:id/status


GET /api/admin/users


----------------------------------------
INVENTORY
----------------------------------------

Implement stock management properly.

Product:

stock


When a successful order is confirmed:

decrease stock.


Prevent:

stock < 0


If two customers try purchasing the final item simultaneously, handle race conditions using atomic database operations or MongoDB transactions.


Admin can update stock manually.


If stock === 0:

product should be returned with:

inStock: false


----------------------------------------
SECURITY
----------------------------------------

Implement:

helmet

cors

rate limiting

MongoDB injection prevention

Request validation

Password hashing

JWT validation

Role-based authorization

Centralized error handling


Never expose:

password

JWT secrets

database credentials

Cloudinary secret

Razorpay secret


Use environment variables.


----------------------------------------
VALIDATION
----------------------------------------

Validate all incoming requests.

Examples:

email valid

password requirements

price >= 0

discountPrice >= 0

stock >= 0

quantity >= 1

valid MongoDB ObjectId


Return errors in consistent structure:

{
   success: false,
   message: "Error message",
   errors: []
}


----------------------------------------
API RESPONSE FORMAT
----------------------------------------

Successful response:

{
   success: true,
   message: "...",
   data: {}
}


Errors:

{
   success: false,
   message: "...",
   errors: []
}


----------------------------------------
ENV
----------------------------------------

Create:

.env.example


PORT=

MONGO_URI=

JWT_SECRET=

JWT_EXPIRES_IN=

CLIENT_URL=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=


----------------------------------------
IMPORTANT
----------------------------------------

Use async/await.

Create reusable utility functions.

Use centralized error handling.

Use proper HTTP status codes.

Use database indexes where appropriate.

Do not put all logic inside routes.

Separate:

routes
controllers
services
models
middleware


Document every API endpoint.

Create an API README explaining:

method
URL
authentication
admin requirement
request body
response


Start by showing me:

1. Complete folder structure
2. Dependencies
3. Environment variables
4. Database connection
5. Models
6. Middleware
7. Controllers
8. Routes
9. Payment integration
10. Error handling
11. Server setup

Generate complete working files instead of incomplete code snippets.