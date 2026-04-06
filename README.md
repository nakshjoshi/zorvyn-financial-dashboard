# Zorvyn Financial Dashboard

A fullstack finance dashboard built with Next.js App Router, TypeScript, Zustand, Tailwind CSS, and API routes.

The app demonstrates a clean dashboard workflow:
- fetch data from backend APIs
- manage UI state with Zustand
- filter and sort transactions
- simulate Admin/Viewer role behavior
- show financial insights and charts

## Tech Stack

- Next.js (App Router)
- TypeScript
- Zustand (state management + local persistence)
- Tailwind CSS (styling)
- Recharts (charts)
- Framer Motion (small transitions)
- Bun (package manager and scripts)

## What This Project Includes

### 1. Dashboard Overview
- Summary cards: Total Balance, Total Income, Total Expenses
- Time based chart: Balance Trend
- Categorical chart: Spending Breakdown

### 2. Transactions Section
- Transaction list with Date, Amount, Category, Type, Notes
- Search, filter, sort
- CSV export

### 3. Role Based UI (Frontend simulation)
- Admin can add and edit transactions
- Viewer is read-only
- Role toggle available in the top bar

### 4. Insights Section
- Highest spending category
- Monthly comparison
- Basic analytics (average income, average expense, savings rate)

### 5. State Management
- Global store for transactions, filters, role, loading, error, sorting, and theme
- Built with Zustand

### 6. Responsive UI
- Works on desktop and mobile
- Transactions view uses mobile cards on small screens and table on larger screens

### 7. Currency
- Currency format is Indian Rupee (INR)
- Displayed using `en-IN` locale
- API responses include currency metadata

## Project Structure

```text
app/
	api/
		insights/
		summary/
		transactions/
			[id]/
	dashboard/
	insights/
	transactions/
components/
store/
lib/
types/
```

## API Endpoints

- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `GET /api/summary`
- `GET /api/insights`

Mock data is stored only in API layer (`app/api/_data/transactions-db.ts`) and API responses include delay to simulate backend behavior.

## Run Locally

### 1. Clone repository

```bash
git clone https://github.com/nakshjoshi/zorvyn-financial-dashboard.git
cd zorvyn-financial-dashboard
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start development server

```bash
bun dev
```

Open `http://localhost:3000` in your browser.

## Useful Bun Commands

```bash
# add a dependency
bun add <package-name>

# run lint
bun run lint

# run production build
bun run build

# start production server after build
bun run start
```

## Why This Architecture

- API routes keep data source separate from UI components
- Zustand keeps state logic centralized and avoids prop drilling
- Reusable components keep code modular and easier to scale
- TypeScript interfaces reduce runtime mistakes
- App Router supports clean route-based feature organization

## Notes

- This project uses in-memory mock backend data for demo purposes.
- Restarting the server resets mock data.
- Role system is UI simulation, not full authentication/authorization.
