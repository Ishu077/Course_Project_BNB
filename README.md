# 🏠 WanderLust - Book Your BnB

WanderLust is a full-stack web application for booking bed-and-breakfast stays, inspired by Airbnb. It allows users to explore, list, and review BnBs. The project includes features such as authentication, booking, map integration, cloud image upload, and review system.

---

## ✅ Live Demo

🌍 https://course-project-bnb.onrender.com/listings

---

## 🚀 Features
- 🧭 **Interactive BnB Listings**  
  View and search BnBs with image galleries and detailed descriptions.

- 🔐 **User Authentication**  
  Sign up, log in, and manage your listings and bookings securely.

- 📍 **Map Integration**  
  View location maps for each BnB using Mapbox.

- 🌥️ **Cloud Image Upload**  
  Upload images directly to Cloudinary.

- 💬 **Review & Ratings**  
  Leave reviews and ratings on BnB stays.

- 📦 **Fully CRUD-Enabled**  
  Create, update, and delete listings and reviews.


## 🧱 Tech Stack

### 🌐 Frontend
- EJS (Embedded JavaScript templates)
- HTML, CSS, Bootstrap

### 🛠️ Backend
- Node.js + Express
- MongoDB + Mongoose
- Passport.js for Authentication
- Multer for File Uploads
- Cloudinary for Image Hosting
- Mapbox for Map Embedding

---

## 📁 Project Structure

Course_Project_BNB/
├── models/ # Mongoose schemas
├── routes/ # Express route definitions
├── controllers/ # Business logic
├── views/ # EJS templates
├── public/ # Static assets
├── utils/ # Utility functions
├── middleware.js # Auth & validation middleware
├── app.js # Main server file
├── cloudConfig.js # Cloudinary setup
├── .env # Environment variables
└── package.json

## ⚙️ Installation & Setup
1. Clone the repo
     git clone https://github.com/Ishu077/Course_Project_BNB.git
     cd Course_Project_BNB
2. Install dependencies
    npm install
3. Create a .env file
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_KEY=your_api_key
    CLOUDINARY_SECRET=your_api_secret
    MAPBOX_TOKEN=your_mapbox_token
    DB_URL=your_mongo_connection_string
    SESSION_SECRET=your_session_secret
4. Run the development server

  npm start
5. Open your browser and go to http://localhost:8080

## 🙌 Contributions

Pull requests are welcome!

