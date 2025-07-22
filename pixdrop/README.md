# 📸 Gallery App with Supabase

A responsive image gallery web app built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**. Users can sign up, upload images, and manage their personal image gallery. Authentication and image storage are powered by Supabase.

---

## ✨ Features

- 🔐 User Authentication (Sign up & Sign in with Supabase Auth)
- 📤 Upload images and view them in real time
- 📁 Store and retrieve images from Supabase storage bucket
- 🖼️ Personalized gallery view for each authenticated user
- ⚡ Fast development with Vite and Hot Module Replacement

---

## 📸 Screenshots

> Replace the paths with actual screenshot file names in the `screenshots/` folder

**Home Page**  
![Home Page](./screenshots/home.png)

**Login Page**  
![Login Page](./screenshots/login.png)

**Gallery Page (User Logged In)**  
![Gallery](./screenshots/gallery.png)

**Upload Feature**  
![Upload](./screenshots/upload.png)

---

## 🛠 Tech Stack

| Technology | Description                              |
|------------|------------------------------------------|
| React      | JavaScript library for building the UI   |
| Vite       | Fast frontend build tool                 |
| Tailwind   | Utility-first CSS framework              |
| Supabase   | Backend-as-a-service (Auth + DB + Storage) |

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/gallery-app.git

# Navigate into the project directory
cd gallery-app

# Install dependencies
npm install

# Start the development server
npm run dev

---

## 🔐 Supabase Setup Instructions
Create a new project at Supabase

Enable Authentication (Email/Password)

Create a Storage Bucket named pictures

Add RLS (Row Level Security) policies for inserting and selecting files:

---

##🎯 RLS Policies for pictures bucket:

-- SELECT policy
(bucket_id = 'pictures') AND storage.foldername(name)[1] = auth.uid()

-- INSERT policy
(bucket_id = 'pictures') AND storage.foldername(name)[1] = auth.uid()

---

## 🚀 Quick Start

1. **Set up environment variables**  
   Create `.env` in the project root:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

2. **Install & run**  
   ```bash
   git clone https://github.com/your-username/gallery-app.git
   cd gallery-app
   npm install
   npm run dev
   ```

## 🛠 Tech Stack
- **Frontend**: React + Vite + Tailwind  
- **Backend**: Supabase (Auth + Storage)  

## 🔐 Supabase Setup
1. Create a `pictures` storage bucket  
2. Enable Email/Password auth  
3. Add these RLS policies:
   ```sql
   -- Allow users to access their own files
   (bucket_id = 'pictures') AND (storage.foldername(name)[1] = auth.uid()::text)
   ```

## 🧭 Project Structure
```
src/
├── components/      # Reusable UI
├── pages/           # Main views
├── supabase/        # Client config
└── App.jsx          # Root component
```

*Pro tip:* Replace `your_project_url` and `your_anon_key` with your actual Supabase credentials from Project Settings → API.
