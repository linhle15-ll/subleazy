# Subleazy - We make Sublease Easy!

*Find your next sublease in a few clicks! We make it easy to connect with the right sublessors and sublessees and help you find the perfect place to stay!*

<img width="1141" height="473" alt="subleazy" src="https://github.com/user-attachments/assets/0104f552-8f31-4edc-8cf8-8f9041697010" />

*Subleazy dashboard*

## 🍀 Inspiration
In student communities, two key groups face challenges with housing: **(1) students who need to sublease their current residence while away for internships, co-ops, vacations, or gap semesters**, and **(2) students seeking short-term housing solutions for those same reasons**. Students of Group 1 often have problems wasting money on their unattended residences only to keep the place, while Group 2 finds it hard to have affordable, suitable housing for such medium-length periods of weeks to months. 

The current process for subleasing is inefficient and scattered, primarily relying on platforms like Facebook Marketplace or AirBnB, which is associated with the following issues:
- **Disorganized and overwhelming listings:** Housing posts are scattered and unstructured, making searches time-consuming and frustrating.
- **Lack of transparency:** Listings often lack essential details about the property’s condition, space, and living quality.
- **Difficulty in assessing location convenience:** Users must manually check locations on maps to determine proximity to essential services (e.g., markets, bus stops, schools, workplaces).
- **Risk of scams and fraud:** The absence of verification mechanisms increases the likelihood of fraudulent listings.
- **Inconvenient price comparison and tracking:** Without a centralized platform, comparing rental prices is difficult. Additionally, students lack tools to monitor price changes over time and make informed decisions about deposits.
- **Unclear contract terms and liability:** Students often lack knowledge about the legal process. Not only is it difficult for both parties to draft housing agreements/contracts, but students might also make uninformed decisions which could potentially lead to unwanted legal responsibilities. Since students subletting their space do not own the property, defining responsibilities for damages and contractual obligations can be confusing. 
- **Uncertainty about landlords and housemates:** Students often feel uneasy about renting due to the lack of information about landlords and potential housemates. Knowing that the "landlord" is another student and that the rental space belongs to a fellow student with a similar background can make the process feel safer and more trustworthy.


## 📖 Project Description

### Overview
This project is a web application that streamlines the subleasing process among students, offering a centralized, safe, and transparent platform. The app will allow students to list and find short-term rentals, compare options, and establish clear subleasing agreements—all within a dedicated student-focused ecosystem. Additionally, it will offer features for housemate matching, helping students find compatible individuals to share housing expenses and living spaces.

The **primary users** can be students looking to sublease or rent short-term housing:
- Students subletting their residence: Those who temporarily leave their university for internships, co-ops, study abroad programs, or vacations.
- Students seeking short-term housing: Those in need of a temporary place to stay during their academic or professional commitments.
- Students looking for housemates: Those who prefer to share a living space with compatible tenants to reduce costs and enhance their living experience.

---

## 🧩 Core Features

### **Authentication**
  - JWT Authentication set up with REST API.
  - User signs up with their .edu email, and then sign in to the dashboard.
    
https://github.com/user-attachments/assets/781726bc-e50f-4834-9eec-d07cb9137199
  
### **Seamless sublease post management**:
  - Subleazy provides prompts and structured form to capture essential information about a sublease post, which include title, description, exact addresss, map location, media upload, utilities, self-generated nearby amenities on post submission, checkin/ checkout time, availabilty, and convenience.
  - Prompt sublessors for key details (furniture, pet policy, utility costs) to ensure uniform, informative postings.

<img width="1511" height="827" alt="postings" src="https://github.com/user-attachments/assets/16546c3e-f0c5-4fd1-bff9-3dd9b5ded15a" />

*Posts are displayed publicly in the home page.*

  - User can create a new post or delete an existing post.
    
https://github.com/user-attachments/assets/ffd45b27-a76c-4fd6-b4d8-2ad5fac7db08

### **Search posts and View with map**
  - As user knows where they want to stay, expected sublease availabilies, and some basic criteria such as bedrooms, bathrooms, essentials, and house rules.
  - When entering the posts listing page with map, they can visualize available posts around the searched area that fit their preferences.
    
<img width="1257" height="826" alt="filter" src="https://github.com/user-attachments/assets/a3832c43-40f2-43ff-8190-5694d0d00345" />

*Search bar with basic filter*

https://github.com/user-attachments/assets/54f2c7b3-17e2-439d-a3b6-bee774e0ce76

*Filter by location, budget, amenities, and preferences.*

### **Rank posts based on Sort by preference**
  - Posts are first ranked by price.
  - User can use the *Sort by preference* to add more sorting criteria besides price, for example, "dunkin" or "Dunkin" - sort sublease posts by ascending distance to the nearest Dunkin store of each listed place. Interestingly, user can select both "price" and "dunkin" (or more criteria as they add in) to sort the posts by selected criteria.

https://github.com/user-attachments/assets/dbea891e-0b2c-445c-9e41-f72db7abf866

### **Wish list**
  - When scrolling the posts, users might be interested in some posts, so they can add them to their wishlist to review later, either in grid or table view for best comprehensive comparisons.
  - If they are no longer interested in a post, they can delete them from wishlist.
  
<img width="1511" height="826" alt="wishlist" src="https://github.com/user-attachments/assets/435af17d-cd8c-49a4-9ffb-54c786c209fa" />

https://github.com/user-attachments/assets/db71f156-141a-4d29-ac55-1b473a6045b4

https://github.com/user-attachments/assets/870ff36b-e463-48a1-8685-bb1ff4bba4cd
 
### **Chat & Community**: Connect with landlords, tenants, and potential roommates via 1-1-1 chat or group chat by adding other users' emails to group chat.
  
https://github.com/user-attachments/assets/f6a23562-9396-4107-87e9-a3fd623de7e7

### **Best Matching**: 
  - Suggest the most potential sublease posts to the users as they put them into their wishlist.
  - Users that are interested in the same post are listed as potential house mates. To find the best match with them, user should fill in a Preference form which then shows how much match percents are among the potential housemates.
    
<img width="1511" height="826" alt="match" src="https://github.com/user-attachments/assets/34ee916b-dcf0-482f-9e92-bfe3ad3a3763" />

*Without Preference form filled*

https://github.com/user-attachments/assets/80a4e6a2-4447-45cc-a6a1-f08897853d8b

*User can view the match percent and connect with those that are best matched with them.*

- **Sublease Agreement Process**:
  - Since our target users are students, we offer the Contract Process feature to support with sublease agreement process, which let the users from all parties signing, editing, commenting all on one shared document, and at real time. To better this process, we also implemented an AI assistant that helps check grammar, word usage, contract items, thus helping build a transparent agreement for sublesssors and sublessees.

https://github.com/user-attachments/assets/df763189-a77f-4622-884e-80caaed5c840

---

## Tech Stack
**Frontend**  
- Next.js (React) — application framework and UI rendering
- TailwindCSS — utility-first CSS styling
- shadcn/ui — accessible, reusable UI components
- Zustand — lightweight global state management
- TanStack Query (React Query) — server-state management, caching, and data fetching

**Backend**  
- Node.js + Express.js — REST API and backend logic
- MongoDB Atlas — managed cloud NoSQL database
- Cloudinary (AWS S3-backed) — secure media storage and optimization

**Integrations and Services**  
- Google Maps API — geolocation, autocomplete, and map services
- OpenAI API + Tiptap — AI-assisted contract editing workflow
- ApyHub — .edu academic-email verification
- JWT Authentication — secure identity and session management

## Architecture
Subleazy is built on the MERN stack — MongoDB, Express.js, React/Next.js, and Node.js.

The frontend communicates with the backend using Axios, while Zustand manages local application state. TanStack Query is used for asynchronous server-state workflows such as caching, refetching, background updates, and request deduplication.

For UI, TailwindCSS is paired with shadcn/ui to create a clean, consistent, and accessible component-driven design system.
Media uploads are handled through Cloudinary, which leverages AWS S3 for scalable storage while automatically optimizing images. Google Maps API powers location search and mapping features, and ApyHub supports .edu verification during authentication.

To enhance the leasing workflow, OpenAI API and Tiptap enable smart, editable rental agreements directly inside the app.

## Development Instructions

### Clone the Repository
```bash
git clone <repository-url>
```
### Run client:
```bash 
cd client
npm install
npm run dev
```
### Run server:
```bash 
cd server
npm install
npm run dev
```
## Resource
### Frontend
| Technology                       | Purpose                                             | Docs                                                                                                           |
| -------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Next.js (React)**              | Application framework and UI rendering              | [https://nextjs.org/docs](https://nextjs.org/docs)                                                             |
| **TailwindCSS**                  | Utility-first CSS styling                           | [https://tailwindcss.com/docs](https://tailwindcss.com/docs)                                                   |
| **shadcn/ui**                    | Accessible, reusable UI components                  | [https://ui.shadcn.com](https://ui.shadcn.com)                                                                 |
| **Zustand**                      | Lightweight global state management                 | [https://docs.pmnd.rs/zustand](https://docs.pmnd.rs/zustand)                                                   |
| **TanStack Query (React Query)** | Server-state management, caching, and data fetching | [https://tanstack.com/query/latest/docs/react/overview](https://tanstack.com/query/latest/docs/react/overview) |

### Backend
| Technology                     | Purpose                               | Docs                                                                         |
| ------------------------------ | ------------------------------------- | ---------------------------------------------------------------------------- |
| **Node.js + Express.js**       | REST API and backend logic            | [https://expressjs.com](https://expressjs.com)                               |
| **MongoDB Atlas**              | Managed cloud NoSQL database          | [https://www.mongodb.com/docs/atlas/](https://www.mongodb.com/docs/atlas/)   |
| **Cloudinary (AWS S3-backed)** | Secure media storage and optimization | [https://cloudinary.com/documentation](https://cloudinary.com/documentation) |

### Integration and Services
| Technology              | Purpose                                     | Docs                                                                                                 |
| ----------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Google Maps API**     | Geolocation, autocomplete, and map services | [https://developers.google.com/maps/documentation](https://developers.google.com/maps/documentation) |
| **OpenAI API + Tiptap** | AI-assisted contract editing workflow       | [https://platform.openai.com/docs](https://platform.openai.com/docs)                                 |
| **Tiptap**              | Rich-text editor framework                  | [https://tiptap.dev/docs](https://tiptap.dev/docs)                                                   |
| **ApyHub**              | `.edu` academic-email verification          | [https://apyhub.com/docs](https://apyhub.com/docs)                                                   |
| **JWT Authentication**  | Secure identity and session management      | [https://jwt.io/introduction](https://jwt.io/introduction)                                           |
