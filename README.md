# 🏠 WanderLust - Book Your BnB

WanderLust is a full-stack web application for booking bed-and-breakfast stays, inspired by Airbnb. It allows users to explore, list, and review BnBs. The project includes features such as authentication, booking, map integration, cloud image upload, and a review system.

---

## ✅ Live Demo

🌍 [Explore Book Your BnB](https://course-project-bnb.onrender.com/listings)

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

## 🏗️ System Architecture

### Current Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] --> B[EJS Templates]
        B --> C[Static Assets<br/>CSS/JS/Images]
    end
    
    subgraph "Application Layer"
        D[Express.js Server] --> E[Middleware Stack]
        E --> F[Authentication<br/>Passport.js]
        E --> G[Session Management<br/>Express-Session]
        E --> H[File Upload<br/>Multer]
    end
    
    subgraph "Business Logic"
        I[Controllers] --> J[Listings Controller]
        I --> K[Users Controller]
        I --> L[Reviews Controller]
        
        M[Models] --> N[Listing Model]
        M --> O[User Model]
        M --> P[Review Model]
    end
    
    subgraph "Data Layer"
        Q[MongoDB Atlas] --> R[Users Collection]
        Q --> S[Listings Collection]
        Q --> T[Reviews Collection]
        Q --> U[Sessions Collection]
    end
    
    subgraph "External Services"
        V[Cloudinary<br/>Image Storage]
        W[Mapbox<br/>Maps & Geocoding]
    end
    
    A --> D
    D --> I
    I --> M
    M --> Q
    D --> V
    D --> W
```

### Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Express Server
    participant M as MongoDB
    participant C as Cloudinary
    participant MB as Mapbox
    
    U->>B: Access Listing Page
    B->>S: GET /listings
    S->>M: Query Listings
    M-->>S: Return Listings Data
    S->>MB: Get Location Data
    MB-->>S: Return Map Data
    S-->>B: Render EJS Template
    B-->>U: Display Listings
    
    U->>B: Create New Listing
    B->>S: POST /listings (with image)
    S->>C: Upload Image
    C-->>S: Return Image URL
    S->>M: Save Listing Data
    M-->>S: Confirm Save
    S-->>B: Redirect to Listing
    B-->>U: Show New Listing
```

### Authentication Flow

```mermaid
flowchart TD
    A[User Access] --> B{Authenticated?}
    B -->|No| C[Login/Signup Page]
    B -->|Yes| D[Protected Route]
    
    C --> E[Submit Credentials]
    E --> F[Passport.js Validation]
    F --> G{Valid?}
    G -->|No| H[Flash Error Message]
    G -->|Yes| I[Create Session]
    
    H --> C
    I --> J[Store in MongoDB]
    J --> D
    
    D --> K[Access Granted]
    K --> L[User Dashboard/Actions]
```

### Database Schema Relationships

```mermaid
erDiagram
    USER ||--o{ LISTING : creates
    USER ||--o{ REVIEW : writes
    LISTING ||--o{ REVIEW : receives
    
    USER {
        ObjectId _id
        string username
        string email
        string password_hash
        date created_at
    }
    
    LISTING {
        ObjectId _id
        string title
        string description
        number price
        string location
        string country
        string image_url
        ObjectId owner_id
        array coordinates
        date created_at
    }
    
    REVIEW {
        ObjectId _id
        string comment
        number rating
        ObjectId author_id
        ObjectId listing_id
        date created_at
    }
```

### Future Architecture (Microservices)

```mermaid
graph TB
    subgraph "API Gateway"
        AG[API Gateway<br/>Load Balancer]
    end
    
    subgraph "Frontend Services"
        WEB[Web App<br/>React/Next.js]
        MOBILE[Mobile App<br/>React Native]
        PWA[Progressive Web App]
    end
    
    subgraph "Microservices"
        US[User Service<br/>Authentication]
        LS[Listing Service<br/>Property Management]
        BS[Booking Service<br/>Reservations]
        RS[Review Service<br/>Ratings]
        PS[Payment Service<br/>Transactions]
        NS[Notification Service<br/>Real-time Updates]
    end
    
    subgraph "Data Stores"
        UDB[(User DB<br/>PostgreSQL)]
        LDB[(Listing DB<br/>MongoDB)]
        BDB[(Booking DB<br/>PostgreSQL)]
        RDB[(Review DB<br/>MongoDB)]
        CACHE[(Redis Cache)]
    end
    
    subgraph "External Services"
        CLOUD[Cloudinary]
        MAP[Mapbox]
        STRIPE[Stripe]
        EMAIL[SendGrid]
    end
    
    subgraph "Infrastructure"
        DOCKER[Docker Containers]
        K8S[Kubernetes]
        MONITOR[Monitoring<br/>Prometheus/Grafana]
    end
    
    WEB --> AG
    MOBILE --> AG
    PWA --> AG
    
    AG --> US
    AG --> LS
    AG --> BS
    AG --> RS
    AG --> PS
    AG --> NS
    
    US --> UDB
    LS --> LDB
    BS --> BDB
    RS --> RDB
    
    US --> CACHE
    LS --> CACHE
    BS --> CACHE
    
    LS --> CLOUD
    LS --> MAP
    PS --> STRIPE
    NS --> EMAIL
    
    US --> DOCKER
    LS --> DOCKER
    BS --> DOCKER
    RS --> DOCKER
    PS --> DOCKER
    NS --> DOCKER
    
    DOCKER --> K8S
    K8S --> MONITOR
```

### Technology Stack Evolution

```mermaid
timeline
    title Technology Evolution Roadmap
    
    section Current (v1.0)
        Node.js + Express : Monolithic Architecture
        MongoDB : Single Database
        EJS Templates : Server-side Rendering
        Passport.js : Basic Authentication
        
    section Phase 1 (v2.0)
        API Optimization : RESTful APIs
        Caching Layer : Redis Implementation
        Testing Suite : Jest + Supertest
        CI/CD Pipeline : GitHub Actions
        
    section Phase 2 (v3.0)
        Microservices : Service Decomposition
        React Frontend : SPA Implementation
        Real-time Features : WebSocket Integration
        Payment Gateway : Stripe Integration
        
    section Phase 3 (v4.0)
        Mobile Apps : React Native
        AI Features : ML Recommendations
        Advanced Search : Elasticsearch
        Global CDN : Performance Optimization
```

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




