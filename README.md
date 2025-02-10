# 🚀 Star Wars Starships Project with Angular


## 📄 Description
In this project, we are building a web application to display and interact with data about **Star Wars starships**.

The application fetches data from the **Star Wars API**, allowing users to:
- View a list of starships.
- Explore detailed information about each starship.
- Manage user authentication (login and register).
- Access protected routes using authentication guards.

The goal is to practice using **Angular**, **APIs**, **routing**, and **authentication guards**, while implementing modern web development practices.

|   |   |   |
|---|---|---|
![home](https://github.com/user-attachments/assets/4edca746-5108-4f83-b1a7-aa5063dc214c) | ![home1](https://github.com/user-attachments/assets/b471d9a2-5836-472f-98e1-4d3b729ef1ba) | ![home2](https://github.com/user-attachments/assets/1d177433-e9ad-4886-826b-4f4eb7e315d3)



---

## 🚀 Technologies Used
- **HTML/SASS/**: For building responsive and visually appealing interfaces.
- **Angular**: Framework for component-based development, routing, and managing application logic.
- **RxJS**: For handling observables and asynchronous data streams.
- **Firebase**: For managing user authentication and securing routes.
- **TypeScript**: For strong typing and scalable code structure.
- **REST APIs**: To fetch and display data dynamically.
- **Tailwind CSS + DAISYUI**: For styling and modern UI components.
- **Jest**: For unit testing components.

---

## 📋 Requirements
To run this project locally, you’ll need:
- **Node.js** (version 14 or higher) and npm
- **Angular CLI**: To run and build the application
- **Visual Studio Code** (recommended editor)

---

## 🌐 Deployment
### To run the application locally:
1. Clone the repository:
   ```bash
   git clone <repository_url>
2. Install dependencies
   npm install
   ng serve -o
# 📝 Functionality Overview

## Key Features:

### List of Starships:
![listStarships](https://github.com/user-attachments/assets/02fa5950-02a2-44f0-8e1e-790f50c6fd84)
- Fetches and displays a paginated list of starships from the **Star Wars API**.
- Shows key details such as the **name** and **model**.


### Starship Details:
![starshipsDetails](https://github.com/user-attachments/assets/e792f2a2-d78f-4f81-be24-fbd6936c82b7)

- Clicking on a starship in the list displays a detailed page with all information about the starship.

### Pagination:
- Includes a **"View More"** button to load additional starships from the API.
- Optionally implements **infinite scrolling** for a seamless user experience.

### Authentication:
|   |   |   |
|---|---|---|
![login](https://github.com/user-attachments/assets/12073e01-9de1-4b88-be31-7adcb09e7620) | ![register](https://github.com/user-attachments/assets/b75a8f06-5ed8-4254-b17c-d8242f56b7a8) | ![logout](https://github.com/user-attachments/assets/26d3f446-fca0-4421-a90a-4c29d38c3fba)



- Users must log in to view the list of starships.
- Implements **registration**, **login**, and **logout** functionality using Firebase.
- Protects routes with **guards** to ensure only authenticated users can access restricted content.
  


### Dynamic Routing:
- Redirects users to the login page when accessing restricted routes.
- After login, users are redirected to their originally requested route.

### Pilot and Film Information:
|   |   |
|---|---|
![pilot](https://github.com/user-attachments/assets/1d1077aa-2bb2-4684-b759-dba7a6d30cf8) | ![film](https://github.com/user-attachments/assets/37616c26-b593-43cf-b483-3cd4494423d7) 



- Each starship detaillog page includes cards for its associated **pilots** and **films**.


# 🔧 API Details

### **Star Wars API (SWAPI)**:
- [Documentation](https://swapi.dev/documentation)
- **Base URL**: `https://swapi.dev/api/starships`
- **Pagination**: `https://swapi.dev/api/starships/?page=1`

### **Star Wars Visual Guide**:
- [Images](https://starwars-visualguide.com/)
- **Example Image**: `https://starwars-visualguide.com/assets/img/starships/5.jpg`

---

# ⚙️ Testing Notes

### Key Test Cases:
1. **Validate API Integration**:
   - Ensure starships are fetched and displayed correctly.
2. **Authentication Guards**:
   - Verify only logged-in users can access the starship list.
3. **UI Responsiveness**:
   - Test the application’s layout and design on various devices.
4. **Unit Tests**:
   - Ensure at least three components have test coverage using Jest.

---

# 📋 Exercises

### Exercise 1: Display Starship List
- Implement the home page to display the **name** and **model** of starships.

### Exercise 2: Starship Details
- Create a detailed view for each starship, showing all available information.

### Exercise 3: Pagination
- Add a **"View More"** button to fetch and display additional starships.

### Exercise 4: Styling
- Style the application to resemble the official Star Wars website.

### Exercise 5: Routing and Navigation
- Implement routing with navigation to the starship list and detail pages.
- Add a home page with a welcome message and navigation button.

### Exercise 6: Authentication
- Add login and register pages.
- Use Firebase for managing authentication and storing user data.

### Exercise 7: Protect Routes with Guards
- Protect the starship list route using an **auth guard**.
- Redirect unauthenticated users to the login page.

---

# 💬 Fun Notes
- Experience the thrill of bringing the **Star Wars universe** to life with Angular!
- Master modern development practices like **routing**, **lazy loading**, and **guards**.
- Watch your app grow from fetching APIs to managing user sessions and displaying dynamic content.

Enjoy your journey to a galaxy far, far away while learning Angular! 🚀✨
