# The Flavor House

A restaurant management system built with [Next.js](https://nextjs.org), featuring role-based dashboards for Admin and Waiter staff.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken) + HTTP-only cookies
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI, Lucide React
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios
- **Notifications:** React Toastify

## Features

### Admin
- Dashboard with revenue, transactions, occupancy stats and charts
- Menu Management — add, update, delete food items with category filtering and availability toggle
- Staff Management — create, update, delete staff with roles (admin, manager, waiter)

### Waiter
- Table overview with filter bar
- Orders management

## Project Structure

```
app/
├── admin/
│   ├── menu/        # Menu management page
│   ├── staff/       # Staff management page
│   └── page.jsx     # Admin dashboard
├── waiter/
│   ├── orders/      # Orders page
│   └── page.jsx     # Waiter dashboard
├── api/
│   ├── auth/        # Login API
│   ├── category/    # Category CRUD
│   ├── foodItems/   # Food items CRUD
│   └── users/       # Users CRUD
├── controllers/     # Auth & user logic
├── models/          # Mongoose models (User, Category, FoodItem)
└── libs/            # MongoDB connection
components/
├── ui/              # Reusable UI primitives
├── AdminDashboard.jsx
├── AdminSidebar.jsx
├── WaiterSidebar.jsx
├── Login.jsx
└── ...
```

## Demo Login Credentials

Navigate to [http://localhost:3000](http://localhost:3000) to access the login page.

| Role   | Username | Password   |
|--------|----------|------------|
| Admin  | admin    | admin123   |
| Waiter | waiter   | waiter123  |

After login, users are redirected based on their role:
- **Admin** → `/admin`
- **Waiter** → `/waiter`

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | `/api/auth`           | Login                |
| GET    | `/api/users`          | Get all users        |
| POST   | `/api/users`          | Create user          |
| PUT    | `/api/users/:id`      | Update user          |
| DELETE | `/api/users/:id`      | Delete user          |
| GET    | `/api/foodItems`      | Get all food items   |
| POST   | `/api/foodItems`      | Create food item     |
| DELETE | `/api/foodItems/:id`  | Delete food item     |
| GET    | `/api/category`       | Get all categories   |

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Set the environment variables in the Vercel dashboard before deploying.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
