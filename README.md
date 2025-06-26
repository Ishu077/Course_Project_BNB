# 🏠 WanderLust - Book Your BnB

WanderLust is a full-stack web application for booking bed-and-breakfast stays, inspired by Airbnb. It allows users to explore, list, and review BnBs. The project includes features such as authentication, booking, map integration, cloud image upload, and a review system.

---

## ✅ Live Demo

🌍 [Explore WanderLust](https://course-project-bnb.onrender.com/listings)

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

- 💬 **Reviews & Ratings**  
  Leave reviews and ratings on BnB stays.

- 📦 **Full CRUD Functionality**  
  Create, update, and delete listings and reviews.

---

## 🧱 Tech Stack

### 🌐 Frontend
- EJS (Embedded JavaScript templates)
- HTML, CSS, Bootstrap

### 🛠 Backend
- Node.js + Express
- MongoDB + Mongoose
- Passport.js for authentication
- Multer for file uploads
- Cloudinary for image hosting
- Mapbox for map integration

---

## 📁 File Structure

The project is organized as follows:
/
├── models/                         # Mongoose schemas
│   ├── user.js                     # User schema & methods
│   ├── bnb.js                      # BnB listing schema
│   └── review.js                   # Review & rating schema
├── routes/                         # Express route definitions
│   ├── index.js                    # Home & catch-all routes
│   ├── listings.js                 # BnB listing CRUD routes
│   ├── users.js                    # Auth & user-profile routes
│   └── reviews.js                  # Review posting routes
├── controllers/                    # Business logic & route handlers
│   ├── listingsController.js       
│   ├── usersController.js          
│   └── reviewsController.js        
├── views/                          # EJS templates
│   ├── layouts/                    
│   │   └── boilerplate.ejs         # Base HTML layout
│   ├── listings/                   
│   │   ├── index.ejs               # All listings page
│   │   ├── show.ejs                # Single listing detail
│   │   ├── new.ejs                 # Create listing form
│   │   └── edit.ejs                # Edit listing form
│   ├── users/                      
│   │   ├── login.ejs               
│   │   └── register.ejs            
│   ├── partials/                   
│   │   ├── header.ejs              
│   │   ├── footer.ejs              
│   │   └── flash.ejs               # Flash message partial
│   └── reviews/                    
│       └── _review.ejs             # Single review partial
├── public/                         # Static assets
│   ├── css/                        
│   │   └── main.css                
│   ├── js/                         
│   │   └── client.js               
│   └── images/                     
├── uploads/                        # Local upload temp storage
├── utils/                          # Helper functions & middleware
│   ├── validateListing.js          # Joi schema validations
│   └── catchAsync.js               # Async error wrapper
├── middleware.js                   # Authentication & authorization
├── cloudConfig.js                  # Cloudinary setup
├── app.js                          # Main Express application
├── .env                            # Environment variables
├── .gitignore                      # Files & folders to ignore in Git
├── package.json                    # Project metadata & dependencies
└── README.md                       # Project overview & setup instructions


---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ishu077/Course_Project_BNB.git
cd Course_Project_BNB
### 2. Install Dependencies

```bash
npm install
### 3. Configure Environment Variables
Create a .env file in the root directory and add the following:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongo_connection_string
SESSION_SECRET=your_session_secret
### 4. Start the Server
```bash
npm start

### 5. Visit Locally
```bash
Open your browser and go to:
http://localhost:8080




