# ⚡ Quick Start Guide

## 🚀 Get Running in 60 Seconds

### Step 1: Install (30 seconds)
```bash
npm install
```

### Step 2: Start (30 seconds)
```bash
npm start
```

### Step 3: Open Browser
The app automatically opens at: **http://localhost:3000**

---

## 🎯 What You'll See

### Pre-loaded Sample Data
- ✅ **5 Users**: You, Alice, Bob, Charlie, Diana
- ✅ **2 Groups**: "Weekend Trip" and "Roommates"
- ✅ **10+ Expenses**: Various categories and amounts
- ✅ **Real Balances**: Working calculations ready to explore

---

## 📱 Try These Features Immediately

### 1️⃣ View Dashboard (Landing Page)
- See your balance summary
- Check who owes you
- Check who you owe
- View recent expenses

### 2️⃣ Add an Expense (30 seconds)
1. Click **"+ Add Expense"** (top right)
2. Fill in:
   - Description: "Lunch"
   - Amount: 50
   - Category: Food & Dining
3. Keep split as "Equal"
4. Click **"Add Expense"**
5. ✅ Done! See it in your list

### 3️⃣ Create a Group (45 seconds)
1. Go to **Groups** page (bottom nav or sidebar)
2. Click **"+ New Group"**
3. Enter name: "Movie Night"
4. Select members (at least 2)
5. Click **"Create Group"**
6. ✅ Done! Click to view it

### 4️⃣ Settle a Debt (20 seconds)
1. Find a balance card (Dashboard)
2. Click **"Settle up"**
3. Click **"Settle full amount"**
4. Click **"Record Payment"**
5. ✅ Done! Balance updated

### 5️⃣ Simplify Debts (15 seconds)
1. Go to any Group (e.g., "Weekend Trip")
2. Click **"Simplify Debts"**
3. See optimized transactions
4. ✅ Done! Fewer payments needed

---

## 🎨 Visual Tour

### Mobile View
- **Bottom Navigation**: 3 tabs (Dashboard, Expenses, Groups)
- **Add Button**: Top right on every page
- **Cards**: Full width, easy to tap
- **Modals**: Slide up from bottom

### Desktop View
- **Left Sidebar**: Persistent navigation
- **Main Content**: Centered, max-width
- **Multi-column**: Utilizes screen space
- **Hover Effects**: Interactive feedback

---

## 🧪 Test These Scenarios

### Scenario 1: Weekend Trip
```
1. Go to Groups → Weekend Trip
2. See existing expenses
3. Add new expense: "Beach parking"
4. View updated balances
5. Click "Simplify Debts"
```

### Scenario 2: Roommate Expenses
```
1. Go to Groups → Roommates
2. Add expense: "Internet bill"
3. Use "Exact amounts" split
4. Enter different amounts per person
5. See how balances change
```

### Scenario 3: Quick Split
```
1. Dashboard → Add Expense
2. No group (standalone expense)
3. Select just 2 people
4. Use percentage split (60/40)
5. See the calculation
```

---

## 🔍 Explore the Interface

### Header Actions
- **Back Button**: Navigate back (when available)
- **Add Button**: Quick expense entry
- **Title**: Shows current page

### Balance Cards
- **Green**: Money owed to you
- **Red**: Money you owe
- **Click**: Opens settle up modal

### Expense Cards
- **Icon**: Category indicator
- **Top**: Description and total
- **Bottom**: Your share
- **Date**: Relative (Today, Yesterday, etc.)

---

## 💡 Pro Tips

### Quick Actions
- Press **ESC** to close any modal
- Click **backdrop** to close modals
- Use **Tab** for keyboard navigation
- Search on "All Expenses" page

### Split Type Guide
- **Equal**: Best for simple splits
- **Exact**: When amounts vary
- **Percentage**: For proportional splits

### Settle Up Tips
- Use "Half amount" for partial payments
- Record payments as they happen
- Check "Recent Activity" for confirmation

---

## 🎯 Common Use Cases

### 1. Splitting Restaurant Bill
```
✓ Add Expense → "Dinner at restaurant"
✓ Amount: Total bill
✓ Category: Food & Dining
✓ Split: Equal (unless someone ordered more)
✓ Select all diners
```

### 2. Group Trip Expenses
```
✓ Create Group → "Summer Road Trip"
✓ Add members who are going
✓ Add each expense as it happens
✓ At end: Click "Simplify Debts"
✓ Settle up based on simplified view
```

### 3. Roommate Bills
```
✓ Create Group → "Apartment"
✓ Add monthly bills (rent, utilities, etc.)
✓ Use recurring expense pattern
✓ Settle up at month end
```

### 4. Shared Purchases
```
✓ Add Expense → Item description
✓ Select who benefits
✓ Use "Exact amounts" if unequal
✓ Record when paid back
```

---

## 📊 Data Flow

### Adding Expense
```
Add Expense → Form Validation → Calculate Splits
     ↓
Context Update → Balances Recalculated → UI Updates
     ↓
Appears in: Dashboard, Group Page, All Expenses
```

### Settling Up
```
Settle Up → Enter Amount → Create Payment Entry
     ↓
Context Update → Balances Adjusted → UI Updates
     ↓
Shows in: Expense List (as payment), Balances
```

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests (if added)
npm test

# Eject configuration (not recommended)
npm run eject
```

---

## 🔧 Customization Quick Wins

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
primary: {
  600: '#your-color-here'
}
```

### Add Expense Category
Edit `src/constants/config.js`:
```javascript
{ id: 'mycat', name: 'My Category', icon: '🎯', color: '#hex' }
```

### Modify Mock Data
Edit `src/utils/mockData.js` to change:
- User names and avatars
- Group names and members
- Expense amounts and descriptions

---

## ❓ Troubleshooting

### Port 3000 in use?
```bash
# Use different port
PORT=3001 npm start
```

### Dependencies issue?
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles not loading?
```bash
# Rebuild
npm run build
npm start
```

### Modal not closing?
- Click outside modal (backdrop)
- Press ESC key
- Click X button

---

## 📚 Learn More

### Documentation Files
- **README.md** - Full project overview
- **GETTING_STARTED.md** - Detailed setup guide
- **FEATURES.md** - Feature documentation
- **PROJECT_SUMMARY.md** - Complete summary

### Key Concepts
- React Hooks (useState, useEffect, useMemo, useCallback)
- Context API (global state management)
- Tailwind CSS (utility-first styling)
- React Router (client-side routing)

---

## 🎓 Next Steps

### Learn the Codebase
1. Start with `src/App.jsx` - routing setup
2. Check `src/context/AppContext.js` - state management
3. Browse `src/components/` - component structure
4. Read `src/utils/` - utility functions

### Add Your Features
1. Follow existing patterns
2. Create new components in appropriate folders
3. Add constants to `src/constants/`
4. Update Context if needed

### Deploy Your App
1. Run `npm run build`
2. Upload `build/` folder to hosting
3. Configure for client-side routing
4. Done! 🎉

---

## 🚀 You're All Set!

The app is now running with:
- ✅ All features working
- ✅ Sample data loaded
- ✅ Mobile responsive
- ✅ Ready to customize

**Have fun exploring and building! 💰**

---

Need help? Check the other documentation files or examine the code - it's well-commented and organized!

