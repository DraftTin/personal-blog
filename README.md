# Personal Blog Application

A full-stack personal blog application built with **React** for the frontend and **Node.js/Express** for the backend. The app allows users to:

- Create and manage blogs.
- Upload and manage profile avatars.
- View and update their profiles, including activity logs.
- Securely handle authentication with JWT.

## Key Features

### **User Authentication**

- **Login and Register**:
  - Users can securely register and log in to the application.
  - Passwords are hashed using `bcrypt` for security.
- **Token-based Authentication**:
  - Access tokens (short-lived) and refresh tokens (long-lived) are used for secure session management.
  - Token refresh is automated via Axios interceptors.

### **Profile Management**

- **Profile Page**:
  - Displays user details, including username and avatar.
  - Allows users to upload and update their profile picture.
- **Avatar Upload**:
  - Avatars are stored with filenames based on the user's ID (`<user_id>.jpg`).
  - Old avatars are replaced automatically when a new one is uploaded.
  - Avatars are served securely through a dedicated backend route.

### **Blog Features**

- **Create Blogs**:
  - Users can write and publish blogs using a rich-text editor (Quill).
  - Markdown and HTML content are supported.
- **View Blogs**:
  - Blogs are displayed dynamically, showing the content and metadata (author, creation date).

### **Activity Log**

- Displays a user's recent activity (e.g., blogs created).
- Sorted by most recent actions.

### **Responsive Design**

- Fully responsive design using Tailwind CSS for consistent styling and layout.

## Techniques and Libraries Used

### **Frontend**

- **React**:
  - Functional components with hooks like `useState`, `useEffect`, and custom hooks (`useAuth`).
- **React Router**:
  - Implemented routes for navigation (`/login`, `/profile`, `/editor`, etc.).
- **Axios**:
  - Custom Axios instance for handling API requests.
  - Interceptors for automatic token refresh.
- **React Quill**:
  - Integrated rich-text editor for blog creation.
- **Tailwind CSS**:
  - Styled components and layouts for a modern, responsive UI.

### **Backend**

- **Node.js/Express**:
  - RESTful APIs for managing blogs, user profiles, and authentication.
- **JWT (JSON Web Tokens)**:
  - Secure token-based authentication with access and refresh tokens.
- **Multer**:
  - Middleware for handling file uploads (e.g., avatar images).
- **Bcrypt**:
  - Password hashing for secure user registration.
- **MongoDB/Mongoose**:
  - Database schema and queries for blogs, users, and activity logs.

### **File Handling**

- Used `fs` and `path` modules in Node.js to manage file uploads and deletions.
- Avatar images are stored in `uploads/avatars` and served via an Express static route.

### **Error Handling**

- Frontend:
  - Displayed error messages for failed API requests (e.g., blog creation, avatar upload).
- Backend:
  - Middleware for validating data and handling authentication (e.g., `protect`, `validateBlog`).

## How to Use

### **Install Dependencies**

```bash
npm install

```

### Start the backend or frontend server:

```bash
npm run start
```

### Set up the following environment variables in `.env`

```bash
MONGO_URI=<Your MongoDB URI>
PORT=5002
NODE_ENV=production
JWT_SECRET=<Your JWT Secret>
JWT_REFRESH_SECRET=<Your JWT Refresh Secret>
EMAIL_USER=<EMAIL>
EMAIL_PASS=<PASSWORD>
```

### Ensure the `uploads/avatar` exists in your backend project root

```bash
mkdir -p uploads/avatars
```

---

#### **5. Future Enhancements**

```markdown
## Future Enhancements

- Implement social sharing for blogs.
- Add categories/tags for blog organization.
- Use AWS S3 or Cloudinary for scalable avatar and media storage.
- Enable comment functionality for blogs.
- Add analytics for tracking blog views and reactions.
```
