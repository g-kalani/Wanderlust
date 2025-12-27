# 🏠 WanderLust - Airbnb-Style Rental Listing Platform

[![Node.js](https://img.shields.io/badge/Node.js-v22.11.0-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.21.2-blue?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.12.2-green?style=flat-square&logo=mongodb)](https://www.mongodb.com)


A full-stack web application for renting and listing properties, built with **Node.js**, **Express**, **EJS**, and **MongoDB**. Features include property listings, user authentication, reviews & ratings, image uploads via Cloudinary, and responsive design with Bootstrap.

[![Deploys to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=for-the-badge&logo=render)](https://wanderlust-gj0d.onrender.com)

<img width="1920" height="956" alt="image" src="https://github.com/user-attachments/assets/38f2a817-56a7-42c0-8cbe-605e5f2706b6" />
<img width="1920" height="964" alt="image" src="https://github.com/user-attachments/assets/d674def1-a89c-4c1d-990c-60ae239bc31e" />
<img width="1920" height="415" alt="image" src="https://github.com/user-attachments/assets/ad2fa6e7-2940-4ed8-9f65-44e27351b610" />
<img width="1920" height="955" alt="image" src="https://github.com/user-attachments/assets/f9ed8bee-be76-41ab-8330-867880a91d52" />

---

## Features

-  **Property Search & Browse** – Explore rental listings with detailed information
-  **Create & Edit Listings** – Post new properties with images and descriptions
-  **Reviews & Ratings** – Leave and view reviews for properties (1-5 stars)
-  **Image Upload** – Upload property images via Cloudinary cloud storage
-  **User Authentication** – Secure signup, login, and session management
-  **Form Validation** – Joi schema validation on both frontend and backend
-  **Authorization** – Only listing owners can edit or delete their properties
-  **Responsive Design** – Bootstrap 5 for mobile and desktop compatibility
-  **RESTful API** – Clean separation of routes, controllers, and models

---

##  Tech Stack

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


##  Getting Started

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


##  Key Endpoints

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

##  Security Features

- ✅ Password hashing with Passport-Local-Mongoose
- ✅ Session-based authentication
- ✅ CSRF protection via method-override
- ✅ Input validation with Joi
- ✅ Authorization checks (isOwner, isLoggedIn middleware)
- ✅ Secure Cloudinary image uploads
- ✅ HTTPOnly cookies for session tokens

