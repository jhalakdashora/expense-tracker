# 💰 SplitWise Clone - Expense Tracker

A mobile-responsive expense tracking and splitting application built with React and Tailwind CSS, featuring group expense management, debt simplification, and balance tracking.

## ✨ Features

### Core Features
- **📊 Dashboard**: View balance summary, recent activity, and quick access to all features
- **💸 Expense Tracking**: Record shared expenses with flexible split options (equal, exact amounts, percentage)
- **👥 Group Management**: Organize expenses into groups (trips, roommates, etc.)
- **🔄 Debt Simplification**: Automatically simplify debts to minimize payment transactions
- **💳 Settle Up**: Record payments to settle debts between users
- **🔍 Search & Filter**: Search through all expenses and filter by groups

### Split Options
- **Equal Split**: Divide expense equally among members
- **Exact Amounts**: Specify exact amount for each member
- **Percentage Split**: Split by percentage for each member

### UI/UX Features
- 📱 **Mobile-First Design**: Optimized for mobile with responsive layout
- 🎨 **Modern UI**: Clean interface with Tailwind CSS
- 🌈 **Visual Categories**: Color-coded expense categories with icons
- 💡 **Balance Indicators**: Clear visual indicators for who owes whom
- ⚡ **Fast & Smooth**: Optimized performance with React hooks and memoization

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── common/          # Generic UI components (Button, Input, Card, Modal)
│   ├── feature/         # Feature-specific components (ExpenseList, BalanceList)
│   └── layout/          # Layout components (Header, Sidebar, BottomNav)
├── pages/               # Page components (Dashboard, Groups, etc.)
├── context/             # React Context for global state management
├── utils/               # Utility functions
│   ├── formatters.js    # Currency and date formatting
│   ├── validators.js    # Input validation
│   ├── helpers.js       # General helper functions
│   └── debtSimplification.js  # Debt simplification algorithm
├── constants/           # App constants and configuration
│   ├── routes.js        # Route paths
│   ├── theme.js         # Colors, spacing, breakpoints
│   ├── messages.js      # UI messages and labels
│   └── config.js        # App configuration
└── App.jsx              # Main app component with routing
```

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and functional components
- **React Router v6**: Client-side routing
- **Tailwind CSS 3**: Utility-first CSS framework
- **Context API**: Global state management
- **PropTypes**: Runtime type checking

## 💡 Key Concepts

### Debt Simplification Algorithm
The app uses a greedy algorithm to minimize the number of transactions needed to settle all debts:
1. Calculate net balances for all users
2. Separate creditors (positive balance) and debtors (negative balance)
3. Match largest creditor with largest debtor
4. Continue until all debts are settled

### State Management
- **Context API** for global state (users, expenses, groups)
- **Local state** for component-specific state (modals, forms)
- **useMemo** for expensive calculations (balances, filtered lists)
- **useCallback** for stable function references

### Performance Optimizations
- React.memo() for component memoization
- useMemo() for expensive calculations
- useCallback() for stable callbacks
- Lazy loading and code splitting ready

## 📱 Mobile Features

- Touch-optimized UI with minimum 44px touch targets
- Bottom navigation for mobile devices
- Responsive design with mobile-first approach
- Smooth animations and transitions
- Optimized for various screen sizes

## 🎯 Future Enhancements

Potential features for future iterations:
- [ ] Backend integration (Firebase, Node.js)
- [ ] User authentication
- [ ] Expense attachments (receipts)
- [ ] Export to CSV/PDF
- [ ] Push notifications
- [ ] Multi-currency support
- [ ] Recurring expenses
- [ ] Charts and analytics
- [ ] Dark mode

## 📝 Usage Examples

### Creating a Group
1. Navigate to Groups page
2. Click "New Group"
3. Enter group name and select members
4. Click "Create Group"

### Adding an Expense
1. Click "Add Expense" button
2. Fill in description and amount
3. Select who paid
4. Choose split type (equal, exact, percentage)
5. Select members to split between
6. Click "Add Expense"

### Settling a Debt
1. View your balances on Dashboard or Group page
2. Click "Settle up" on a balance card
3. Enter payment amount
4. Click "Record Payment"

### Simplifying Debts
1. Go to a Group detail page
2. Click "Simplify Debts"
3. View optimized payment transactions

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this project for learning or building your own applications.

## 👨‍💻 Developer Notes

### Code Quality Standards
- All components use functional components (no class components)
- PropTypes for type checking
- DRY principle - no code duplication
- Constants for all hardcoded values
- Utility functions for reusable logic
- Mobile-first responsive design
- Performance optimizations throughout

### Testing
Currently using mock data. To add backend:
1. Replace Context API with API calls
2. Add authentication
3. Implement real-time updates
4. Add data persistence

---

Built with ❤️ using React and Tailwind CSS

