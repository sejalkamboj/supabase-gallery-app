# 📸 Gallery App with Supabase

A responsive image gallery web app built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**. Users can sign up, upload images, and manage their personal image gallery. Authentication and image storage are powered by Supabase.

---

## ✨ Features

-  User Authentication (Sign up & Sign in with Supabase Auth)
-  Upload images and view them in real time
-  Store and retrieve images from Supabase storage bucket
-  Personalized gallery view for each authenticated user
-  Fast development with Vite and Hot Module Replacement

---

## 📸 Screenshots


**Signup Page**  
![Signup Page](https://github.com/sejalkamboj/supabase-gallery-app/blob/main/pixdrop/src/assets/screenshots/signup.png)

**Login Page**  
![Login Page](https://github.com/sejalkamboj/supabase-gallery-app/blob/main/pixdrop/src/assets/screenshots/login.png)

**Gallery Page (User Logged In)**  
![Gallery](https://github.com/sejalkamboj/supabase-gallery-app/blob/main/pixdrop/src/assets/screenshots/gallery.png)

**Storage interface in Supabase**  
![Upload](https://github.com/sejalkamboj/supabase-gallery-app/blob/main/pixdrop/src/assets/screenshots/supabase_interface.jpg)

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
```

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
```

---

## 🔐 Supabase Setup Instructions
Create a new project at Supabase

Enable Authentication (Email/Password)

Create a Storage Bucket named pictures

Add RLS (Row Level Security) policies for inserting and selecting files:

---


## 🎯 RLS Policies for pictures bucket:

-- SELECT policy
(bucket_id = 'pictures') AND storage.foldername(name)[1] = auth.uid()

-- INSERT policy
(bucket_id = 'pictures') AND storage.foldername(name)[1] = auth.uid()

---

*Pro tip:* Replace `your_project_url` and `your_anon_key` with your actual Supabase credentials from Project Settings → API.
