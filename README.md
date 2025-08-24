# React E-Commerce Admin & Product Listing App

A modern **React e-commerce application** with a responsive **product listing page** and an **admin panel** to manage products. Built with **React, Tailwind CSS, shadcn/ui, Redux**, and **Axios** for API integration.

---

## Features

### Product Listing

* Fetches products from [Escuela JS API](https://api.escuelajs.co/) using Axios.
* Responsive **grid layout** for products.
* Shows **loading skeletons** while fetching data.
* Hover effects on product cards with **quick actions** (like, view).
* **Pagination** with Previous, Next, and numeric page buttons.
* Handles **no products** case with a friendly message.
* Responsive across all screen sizes.

### Admin Panel

* Protected route: only logged-in users can access `/admin`.
* Add new products with:

  * Product title
  * Price
  * Description
  * Category ID
  * Image URL
* Form validation using **Zod** + **React Hook Form**.
* Success and error **toasts** for feedback.
* Fully responsive and styled with Tailwind + shadcn/ui.

### Authentication

* Login & Signup pages (Redux for authentication state).
* Admin route protected based on **Redux `isAuthenticated` state**.

---

## Tech Stack

* **React** - UI library for building components.
* **Redux** - State management for auth.
* **Tailwind CSS** - Utility-first CSS framework for styling.
* **shadcn/ui** - Ready-to-use UI components.
* **Axios** - HTTP client for API requests.
* **React Hook Form + Zod** - Form handling and validation.
* **React Router DOM** - Client-side routing.
* **Lucide Icons** - Lightweight icon library.

---

## Installation

1. Clone the repository:

```bash
https://github.com/danishshaikh04/ecom-store.git
cd ecom-store
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at:

```
http://localhost:5173
```

---

## Project Structure

```
src/
│
├─ components/       # Reusable components like Navbar, Buttons, Toast
├─ hooks/            # Custom hooks (e.g., use-toast)
├─ pages/
│   ├─ Admin.jsx     # Admin dashboard for adding products
│   ├─ ProductListing.jsx # Product listing page with pagination
│   ├─ ProductDetail.jsx  # Product details page
│   ├─ Login.jsx
│   └─ Signup.jsx
├─ redux/            # Redux slices and store
├─ App.jsx
└─ main.jsx
```

5. Live demo :

```
https://ecom-store-opal.vercel.app/
```

---

## Screenshots

**Product Listing Page**
<img width="1580" height="918" alt="image" src="https://github.com/user-attachments/assets/a342839e-87e8-48ef-b8f2-fd24e75a4c66" />



**Admin Panel**
<img width="1068" height="914" alt="image" src="https://github.com/user-attachments/assets/e19ea9c7-6fa5-4254-bdfc-41fe77cceaa2" />


---

## Usage

1. Navigate to `/` to see products.
2. Use **Previous / Next** or numeric buttons to paginate.
3. Login with valid credentials to access `/admin`.
4. Add new products via the admin form.
5. See success/error feedback via toast notifications.

---

## Future Improvements

* Redux integration for fetching products globally.
* Add **Edit / Delete** product functionality in admin.
* Integrate a **shopping cart** with Redux.
* Add **search & filter** for products.
* Unit testing with **Jest + React Testing Library**.


