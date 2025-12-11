# 🏠 WanderLust - Airbnb-Style Rental Listing Platform

[![Node.js](https://img.shields.io/badge/Node.js-v22.11.0-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.21.2-blue?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.12.2-green?style=flat-square&logo=mongodb)](https://www.mongodb.com)


A full-stack web application for renting and listing properties, built with **Node.js**, **Express**, **EJS**, and **MongoDB**. Features include property listings, user authentication, reviews & ratings, image uploads via Cloudinary, and responsive design with Bootstrap.

---

## ✨ Features

- 🔍 **Property Search & Browse** – Explore rental listings with detailed information
- 📝 **Create & Edit Listings** – Post new properties with images and descriptions
- ⭐ **Reviews & Ratings** – Leave and view reviews for properties (1-5 stars)
- 🖼️ **Image Upload** – Upload property images via Cloudinary cloud storage
- 🔐 **User Authentication** – Secure signup, login, and session management
- ✅ **Form Validation** – Joi schema validation on both frontend and backend
- 🎯 **Authorization** – Only listing owners can edit or delete their properties
- 📱 **Responsive Design** – Bootstrap 5 for mobile and desktop compatibility
- 🌐 **RESTful API** – Clean separation of routes, controllers, and models

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, EJS Templates, Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas), Mongoose ODM |
| **Authentication** | Passport.js, Passport-Local-Mongoose |
| **File Upload** | Cloudinary, Multer, Multer-Storage-Cloudinary |
| **Validation** | Joi |
| **Session Management** | Express-Session, Connect-Mongo |
| **Other** | Method-Override, Connect-Flash, EJS-Mate |

---

## 📁 Project Structure

```
Wanderlust/
├── controllers/           # Business logic for routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── models/               # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/               # API endpoints
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/                # EJS templates
│   ├── includes/        # Navbar, footer, flash messages
│   ├── layouts/         # Boilerplate template
│   ├── listings/        # Listing pages (index, show, new, edit)
│   └── users/           # Auth pages (signup, login)
├── public/              # Static files (CSS, JS, images)
│   ├── css/
│   └── js/
├── seeds/               # Database seeding scripts
│   ├── seedDB.js       # Seed 9 sample listings with users
│   └── fixImages.js    # Update listing images
├── utils/              # Helper functions
│   ├── ExpressError.js
│   └── wrapAsync.js
├── app.js             # Main Express app
├── cloudConfig.js     # Cloudinary configuration
├── middleware.js      # Auth middleware
├── schema.js          # Joi validation schemas
├── .env.example       # Environment variables template
├── .gitignore        # Git ignore file
└── package.json      # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
- Cloudinary account (free tier at https://cloudinary.com)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/g-kalani/Wanderlust.git
   cd Wanderlust
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file from template:**
   ```bash
   cp .env.example .env
   ```

4. **Fill in your environment variables in `.env`:**
   - `ATLAS_DB`: MongoDB Atlas connection string
   - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`: Cloudinary credentials
   - `SESSION_SECRET`: Any random string for session signing

5. **Seed the database (optional, creates sample data):**
   ```bash
   npm run seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

7. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 📚 Available Scripts

- `npm run dev` – Start with nodemon (auto-reload on file changes)
- `npm start` – Start the server (production mode)
- `npm run seed` – Seed database with sample listings and users
- `npm test` – Run tests (currently not configured)

---

## 🔑 Key Endpoints

### Listings
- `GET /listings` – View all listings
- `GET /listings/new` – Create new listing form
- `POST /listings` – Submit new listing
- `GET /listings/:id` – View listing details and reviews
- `GET /listings/:id/edit` – Edit listing form (owner only)
- `PUT /listings/:id` – Update listing (owner only)
- `DELETE /listings/:id` – Delete listing (owner only)

### Reviews
- `POST /listings/:id/reviews` – Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` – Delete review (author only)

### Users
- `GET /signup` – Signup form
- `POST /signup` – Create new user account
- `GET /login` – Login form
- `POST /login` – Authenticate user
- `GET /logout` – Logout user


---

## 🔐 Security Features

- ✅ Password hashing with Passport-Local-Mongoose
- ✅ Session-based authentication
- ✅ CSRF protection via method-override
- ✅ Input validation with Joi
- ✅ Authorization checks (isOwner, isLoggedIn middleware)
- ✅ Secure Cloudinary image uploads
- ✅ HTTPOnly cookies for session tokens

---

## 🌟 Future Enhancements

- 🗺️ Google Maps API integration for location mapping
- 💳 Stripe payment integration for bookings
- 📱 Mobile app with React Native
- 📧 Email notifications (booking confirmations, reviews)
- 🔍 Advanced search filters (price range, amenities, dates)
- 👨‍💼 Admin dashboard for analytics
- 🌐 Multi-language support
- ⭐ Wishlist/favorites feature

---


