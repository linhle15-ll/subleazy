# Subleazy

Subleazy is a **student-focused web application** that streamlines the subleasing process. It provides a centralized, transparent, and secure platform where students can post, find, and manage short-term housing rentals. The platform also supports roommate matching, digital contract assistance — making subleasing safer and easier for student communities.

---

## 📖 Project Overview
Students often struggle with **scattered housing listings, fraud risks, and unclear agreements** when subleasing. Subleazy solves these issues by:  
- Creating a **centralized student-only ecosystem** (verified with .edu emails) using JWT and [Academic Email Validator](https://apyhub.com/utility/validator-academic-email) for edu email verification .  
- Offering **structured listings**, interactive maps, and clear comparisons.
- Helping users to find their **best match** as sublessees and sublessors.
- Supporting **digital agreements** with contract templates and guidance.

Target users include:  
- Students subletting their residence during internships, co-ops, or study abroad.  
- Students seeking short-term housing near campus or work.  
- Students looking for compatible roommates to share housing costs.  

---

## 🚀 Core Features
- **Sublease Posting**: Create, edit, and publish structured listings with images/videos.  
- **Search & Matching**: Filter by location, budget, amenities, and preferences.  
- **Map Integration**: Visualize listings and nearby amenities with commute times.  
- **Student Verification**: Secure sign-up using .edu emails and ID checks.  
- **Wishlist & Comparison**: Save listings and compare side-by-side in a table view.
- **Best Matching**: Match users as sublessees and sublessors based on references, location, interests.  
- **Chat & Community**: Connect with landlords, tenants, and potential roommates.  
- **Contract Assistance**: Pre-formatted templates, guided editing, and risk checks.  

---

## 🛠️ Tech Stack
**Frontend**  
- Next.js (React)  
- TailwindCSS  
- Zustand (state management)
- Tanstack
- ShadCN

**Backend**  
- Node.js with Express.js  
- MongoDB Atlas (database)  
- AWS S3 / Cloudinary (media storage)

**Others**  
- Google Maps API (location services)
- OpenAI API
- TansTack/ ReactQuery 
- JWT + .edu Email Verification (authentication)   

---

## 📌 User Stories (Highlights)
- As a **sublessor**, I can post and manage listings with all necessary details.  
- As a **sublessee**, I can search and filter listings, view them on an interactive map, and save them to my wishlist.  
- As a **student**, I can verify my identity using my .edu email and optional student ID.  
- As a **user**, I can compare listings side-by-side to make better decisions.  
- As a **student renter**, I can generate and review rental contracts with guided templates.  
- As a **community member**, I can chat with others, leave reviews, and report scams.  

---

## 🖥️ Development Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
```
- Run client:
```bash 
cd client
npm run dev
```
- Run server:
```bash 
cd server
npm run dev
```

---

We are updating demo video and images.
