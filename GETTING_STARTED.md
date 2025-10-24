# 🚀 Getting Started Guide

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages:
- React 18.2.0
- React Router DOM 6.20.0
- Tailwind CSS 3.3.6
- And other dev dependencies

### 2. Start Development Server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### 3. Explore the App!
The app comes pre-loaded with **mock data** so you can immediately:
- View the Dashboard with balance summaries
- Explore existing groups (Weekend Trip, Roommates)
- Add new expenses
- Settle up debts
- Create new groups

---

## 📱 Features Tour

### Dashboard Page
- **Summary Cards**: See what you owe, what you're owed, and net balance
- **Balance List**: Quick view of all your balances with settle-up buttons
- **Recent Activity**: Latest 10 expenses across all groups

### Groups Page
- **View All Groups**: See all your expense groups
- **Create New Group**: Click "+ New Group" to create a group
- **Group Summary**: Each card shows member count, expense count, and your balance

### Group Detail Page
- **Group Info**: Members, total expenses, description
- **Balances**: See who owes whom within this group
- **Simplify Debts**: Click to see optimized payment transactions
- **Expenses List**: All expenses for this group

### All Expenses Page
- **Search**: Find expenses by description
- **Total Summary**: See total expenses and count
- **Full List**: All expenses across all groups

---

## 🎯 Common Tasks

### Adding an Expense
1. Click **"Add Expense"** button (top right or bottom nav)
2. Fill in the form:
   - **Description**: e.g., "Dinner at restaurant"
   - **Amount**: e.g., 120.00
   - **Paid by**: Select who paid
   - **Category**: Choose a category (Food, Transport, etc.)
   - **Split Type**: Choose how to split
     - **Equal**: Divide equally
     - **Exact**: Enter specific amounts
     - **Percentage**: Split by percentage
   - **Split Between**: Check members to include
3. Click **"Add Expense"**

### Creating a Group
1. Go to **Groups** page
2. Click **"+ New Group"**
3. Enter:
   - **Group Name**: e.g., "Summer Vacation"
   - **Description** (optional): e.g., "Road trip expenses"
   - **Members**: Select at least 2 members (you're always included)
4. Click **"Create Group"**

### Settling a Debt
1. Find a balance card on Dashboard or Group page
2. Click **"Settle up"** button
3. Enter payment amount (or use quick buttons)
4. Click **"Record Payment"**
5. A payment entry is created and balances are updated

### Simplifying Debts (Group Only)
1. Go to a Group detail page
2. Click **"Simplify Debts"**
3. View the minimum transactions needed to settle all debts
4. Example: If A owes B $20 and B owes C $20, it shows A pays C $20 directly

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Select.jsx
│   ├── feature/         # Feature-specific components
│   │   ├── AddExpenseModal.jsx
│   │   ├── AddGroupModal.jsx
│   │   ├── SettleUpModal.jsx
│   │   ├── BalanceCard.jsx
│   │   ├── BalanceList.jsx
│   │   ├── ExpenseItem.jsx
│   │   ├── ExpenseList.jsx
│   │   └── GroupCard.jsx
│   └── layout/          # Layout components
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       ├── BottomNav.jsx
│       └── Layout.jsx
├── pages/               # Page components
│   ├── Dashboard.jsx
│   ├── Groups.jsx
│   ├── GroupDetail.jsx
│   └── AllExpenses.jsx
├── context/             # Global state management
│   └── AppContext.js
├── utils/               # Utility functions
│   ├── formatters.js    # Currency, date formatting
│   ├── validators.js    # Input validation
│   ├── helpers.js       # Helper functions
│   ├── debtSimplification.js  # Debt algorithm
│   └── mockData.js      # Sample data generator
├── constants/           # App constants
│   ├── routes.js        # Route paths
│   ├── theme.js         # Colors, spacing
│   ├── messages.js      # UI text
│   ├── config.js        # Configuration
│   └── index.js         # Barrel export
├── App.jsx              # Main app with routing
├── index.js             # Entry point
└── index.css            # Global styles
```

---

## 💡 Key Concepts

### Split Types Explained

**1. Equal Split** (Default)
- Divides amount equally among selected members
- Example: $100 split among 3 people = $33.33, $33.33, $33.34

**2. Exact Amounts**
- Enter specific amount for each person
- Must add up to total amount
- Example: $100 → Alice: $40, Bob: $35, Charlie: $25

**3. Percentage Split**
- Enter percentage for each person
- Must add up to 100%
- Example: $100 → Alice: 50%, Bob: 30%, Charlie: 20%

### Balance Calculations

The app automatically calculates:
- **Who owes you**: People who need to pay you
- **Who you owe**: People you need to pay
- **Net balance**: Your overall position (positive = owed, negative = owing)

### Debt Simplification Algorithm

Uses a **greedy algorithm** to minimize transactions:
1. Calculate net balance for each person
2. Separate creditors (positive) and debtors (negative)
3. Match largest creditor with largest debtor
4. Repeat until all settled

**Example:**
- Before: A owes B $50, B owes C $50
- After: A pays C $50 directly (1 transaction instead of 2)

---

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
  }
}
```

### Adding New Categories
Edit `src/constants/config.js`:
```javascript
export const EXPENSE_CATEGORIES = [
  // Add your category
  { id: 'custom', name: 'Custom', icon: '🎯', color: '#color' },
];
```

### Modifying Mock Data
Edit `src/utils/mockData.js` to change default users, groups, or expenses.

---

## 📱 Mobile Features

- **Touch Optimized**: All buttons are minimum 44px for easy tapping
- **Bottom Navigation**: Easy thumb access on mobile
- **Responsive Design**: Adapts from 320px (mobile) to 1280px+ (desktop)
- **Swipe-Friendly**: Smooth scrolling and transitions

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
PORT=3001 npm start
```

### Styles not loading?
```bash
# Rebuild Tailwind
npm run build
```

### React Router not working after build?
- Make sure your server is configured for client-side routing
- For development, `npm start` handles this automatically

---

## 🔮 Next Steps

### Adding Backend
1. Create API endpoints for CRUD operations
2. Replace Context API actions with API calls
3. Add authentication
4. Implement real-time updates (WebSocket/Firebase)

### Adding More Features
- Export to PDF/CSV
- Recurring expenses
- Budget tracking
- Expense categories analytics
- Multi-currency support
- Notifications

### Deploying
```bash
# Build for production
npm run build

# Deploy to Netlify, Vercel, or your hosting provider
```

---

## 📚 Learning Resources

- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)

---

## 🤝 Need Help?

Check the main README.md for:
- Architecture details
- Code quality standards
- Performance optimizations
- Contributing guidelines

---

**Happy Expense Tracking! 💰**

