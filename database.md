Design the complete MongoDB database for my MERN stack e-commerce website.

Use:

MongoDB
Mongoose
Node.js

I have an online store connected to my physical shop.

There are two types of users:

customer
admin


The application contains:

Users
Products
Categories
Cart
Addresses
Orders
Payments


I want you to design production-quality Mongoose schemas with proper:

relationships
indexes
validation
timestamps
references
embedded documents
constraints


--------------------------------------
USER MODEL
--------------------------------------

Create User schema.

Fields:

name

email

phone

password

role

isActive

createdAt

updatedAt


role enum:

customer
admin


Email must:

be unique
be lowercase
be indexed


Password must never be returned from queries by default.

Use:

select: false


--------------------------------------
CATEGORY MODEL
--------------------------------------

Fields:

name
slug
description
image
isActive

timestamps


Indexes:

slug unique


--------------------------------------
PRODUCT MODEL
--------------------------------------

Fields:

name

slug

description

shortDescription

price

discountPrice

category

brand

sku

stock

images

featured

isActive

createdAt

updatedAt


category:

ObjectId reference to Category


images:

[
 {
   publicId: String,
   url: String
 }
]


Validation:

price >= 0

discountPrice >= 0

stock >= 0


SKU should be unique when provided.

Slug should be unique.


Add indexes useful for:

search

category filtering

sorting by price

featured products

stock lookup


Create virtual:

inStock


return:

stock > 0


Create virtual:

finalPrice


If discountPrice is valid:

return discountPrice

otherwise:

return price


--------------------------------------
ADDRESS MODEL
--------------------------------------

Fields:

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

timestamps


user:

ObjectId reference User


Index addresses by:

user


Make sure users can have several addresses.


Only one should normally be default.


Explain how application logic should enforce this.


--------------------------------------
CART MODEL
--------------------------------------

Fields:

user

items


user:

ObjectId ref User


items:

[
 {
   product:
       ObjectId ref Product

   quantity:
       Number
 }
]


One cart per user.


Create unique index:

user


Validate quantity >= 1.


Avoid storing product prices in Cart because prices may change.

Price must always be fetched from Product during cart/checkout calculations.


--------------------------------------
ORDER MODEL
--------------------------------------

Design Order carefully.


Fields:

user

orderNumber

items

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

notes

createdAt

updatedAt


items should use snapshots:

[
 {
   product: ObjectId,

   name: String,

   image: String,

   price: Number,

   quantity: Number
 }
]


Do NOT rely entirely on Product reference when showing old orders.

Store:

product name
product image
price

inside Order item.

This prevents an old order from changing when product name/price changes.


--------------------------------------
SHIPPING ADDRESS SNAPSHOT
--------------------------------------

Inside an Order, store a snapshot:

shippingAddress: {

fullName

phone

addressLine1

addressLine2

landmark

city

state

postalCode

country

}


Do NOT only reference Address model.

This ensures an old order keeps the original delivery address even if customer later changes their saved address.


--------------------------------------
PAYMENT
--------------------------------------

paymentMethod enum:

COD
RAZORPAY


paymentStatus enum:

Pending
Paid
Failed
Refunded


Store:

razorpayOrderId
razorpayPaymentId


If you recommend a separate Payment collection for audit/reconciliation, create it.

Possible Payment fields:

user

order

provider

providerOrderId

providerPaymentId

amount

currency

status

metadata

createdAt

updatedAt


Explain whether Payment should be embedded or stored separately.


--------------------------------------
ORDER STATUS
--------------------------------------

orderStatus enum:

Pending
Confirmed
Processing
Shipped
OutForDelivery
Delivered
Cancelled


Also create an optional:

statusHistory


structure:

[
 {
   status,
   timestamp,
   changedBy
 }
]


This will allow displaying order tracking.


--------------------------------------
ORDER NUMBER
--------------------------------------

Generate human-readable order numbers.

Example:

ORD-20260913-123456


Do not use only MongoDB ObjectId as customer-facing order number.


Ensure uniqueness.


--------------------------------------
DATABASE RELATIONSHIPS
--------------------------------------

Explain relationships between:

User → Addresses

User → Cart

User → Orders

Category → Products

Products → Cart

Products → Orders

Order → Payment


Give me a clear database relationship diagram in text form.


--------------------------------------
INDEXES
--------------------------------------

Recommend appropriate indexes for:

Users

Products

Categories

Orders

Cart

Addresses

Payments


For Products support:

search by product name

category

price

featured

isActive


For Orders support:

user

orderNumber

status

createdAt


--------------------------------------
TRANSACTIONS
--------------------------------------

Explain where MongoDB transactions are needed.

Especially when placing an order:

1. Validate products
2. Validate stock
3. Decrease product stock
4. Create order
5. Create payment data if needed
6. Clear cart


Prevent overselling.


Use atomic operators such as:

$inc

with condition:

stock >= requestedQuantity


Explain transaction strategy.


--------------------------------------
DATA CONSISTENCY
--------------------------------------

Do not trust frontend prices.

Checkout should always read:

product.price

or

product.discountPrice

from the database.


Calculate:

subtotal

discount

shipping

total

on backend.


--------------------------------------
MONGOOSE
--------------------------------------

Generate complete Mongoose models:

User.js

Category.js

Product.js

Address.js

Cart.js

Order.js

Payment.js


Use:

timestamps: true


Create proper:

schema validation

enum validation

indexes

references

virtual fields


Use ES Module exports.


--------------------------------------
SEEDING
--------------------------------------

Also create:

seedAdmin.js

and

seedProducts.js


Admin should be created from environment variables:

ADMIN_NAME
ADMIN_EMAIL
ADMIN_PASSWORD


Never hardcode the admin password.


--------------------------------------
OUTPUT ORDER
--------------------------------------

Give me the answer in this order:

1. Database architecture explanation

2. Entity relationship diagram

3. User schema

4. Category schema

5. Product schema

6. Address schema

7. Cart schema

8. Order schema

9. Payment schema

10. Index explanation

11. Transaction strategy

12. Seed scripts

13. Example documents

14. Recommended production database practices


Write complete code.

Do not give pseudocode.

Do not simplify the schemas for a tutorial.

Design it so it could reasonably be extended into a real production e-commerce application.