# 📦 Component Reference Guide

## Common Components (`src/components/common/`)

### Button.jsx
**Purpose**: Reusable button component with multiple variants

**Props**:
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `disabled`: boolean
- `loading`: boolean
- `icon`: React node
- `onClick`: function
- `type`: 'button' | 'submit' | 'reset'

**Usage**:
```jsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

---

### Card.jsx
**Purpose**: Container component with consistent styling

**Props**:
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `shadow`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean
- `onClick`: function
- `className`: string

**Usage**:
```jsx
<Card padding="md" hoverable onClick={handleClick}>
  <p>Card content</p>
</Card>
```

---

### Input.jsx
**Purpose**: Form input with label, error, and icon support

**Props**:
- `label`: string
- `type`: string
- `value`: string | number
- `onChange`: function
- `placeholder`: string
- `error`: string
- `helperText`: string
- `required`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `icon`: React node

**Usage**:
```jsx
<Input
  label="Amount"
  type="number"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  error={errors.amount}
  icon={<span>$</span>}
  required
/>
```

---

### Modal.jsx
**Purpose**: Dialog modal with backdrop and animations

**Props**:
- `isOpen`: boolean (required)
- `onClose`: function (required)
- `title`: string
- `footer`: React node
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnBackdropClick`: boolean
- `showCloseButton`: boolean

**Usage**:
```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Add Expense"
  footer={<Button onClick={handleSave}>Save</Button>}
>
  <p>Modal content</p>
</Modal>
```

---

### Select.jsx
**Purpose**: Dropdown select with custom styling

**Props**:
- `label`: string
- `value`: string | number
- `onChange`: function (required)
- `options`: array of { value, label } (required)
- `placeholder`: string
- `error`: string
- `disabled`: boolean
- `required`: boolean
- `fullWidth`: boolean

**Usage**:
```jsx
<Select
  label="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  options={categoryOptions}
  required
/>
```

---

## Feature Components (`src/components/feature/`)

### AddExpenseModal.jsx
**Purpose**: Modal for adding new expenses

**Props**:
- `isOpen`: boolean (required)
- `onClose`: function (required)
- `groupId`: string (optional)

**Features**:
- Form validation
- Multiple split types
- Member selection
- Category picker
- Custom split amounts

**Usage**:
```jsx
<AddExpenseModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  groupId={currentGroupId}
/>
```

---

### AddGroupModal.jsx
**Purpose**: Modal for creating new groups

**Props**:
- `isOpen`: boolean (required)
- `onClose`: function (required)

**Features**:
- Group name and description
- Member selection
- Validation
- Auto-includes current user

**Usage**:
```jsx
<AddGroupModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>
```

---

### SettleUpModal.jsx
**Purpose**: Modal for recording debt payments

**Props**:
- `isOpen`: boolean (required)
- `onClose`: function (required)
- `balance`: object with { userId, userName, amount, type }
- `groupId`: string (optional)

**Features**:
- Amount input with validation
- Quick amount buttons
- Payment recording
- Balance adjustment

**Usage**:
```jsx
<SettleUpModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  balance={selectedBalance}
  groupId={groupId}
/>
```

---

### BalanceCard.jsx
**Purpose**: Display individual balance with settle button

**Props**:
- `balance`: object (required)
  - `userId`: string
  - `userName`: string
  - `amount`: number
  - `type`: 'owes_you' | 'you_owe'
- `onClick`: function

**Features**:
- Color-coded border (green/red)
- Formatted amount
- Settle button
- Clickable for details

**Usage**:
```jsx
<BalanceCard
  balance={balanceData}
  onClick={() => handleSettleUp(balanceData)}
/>
```

---

### BalanceList.jsx
**Purpose**: List of all balance cards with empty state

**Props**:
- `balances`: array of balance objects (required)
- `onSettleUp`: function (required)

**Features**:
- Maps balance cards
- Empty state with icon
- Sorted by amount

**Usage**:
```jsx
<BalanceList
  balances={userBalances}
  onSettleUp={handleSettleUp}
/>
```

---

### ExpenseItem.jsx
**Purpose**: Single expense card with details

**Props**:
- `expense`: object (required)
  - `id`: string
  - `description`: string
  - `amount`: number
  - `paidBy`: string
  - `splits`: array
  - `category`: string
  - `date`: string
- `onClick`: function

**Features**:
- Category icon and color
- Payer information
- User's share highlighted
- Relative date
- Split count

**Usage**:
```jsx
<ExpenseItem
  expense={expenseData}
  onClick={() => handleExpenseClick(expenseData)}
/>
```

---

### ExpenseList.jsx
**Purpose**: List of expense items with empty state

**Props**:
- `expenses`: array of expense objects (required)
- `onExpenseClick`: function

**Features**:
- Maps expense items
- Empty state with icon
- Sorted display

**Usage**:
```jsx
<ExpenseList
  expenses={filteredExpenses}
  onExpenseClick={handleExpenseClick}
/>
```

---

### GroupCard.jsx
**Purpose**: Group summary card with balance info

**Props**:
- `group`: object (required)
  - `id`: string
  - `name`: string
  - `description`: string
  - `members`: array
- `onClick`: function

**Features**:
- Member count
- Expense count
- Balance summary
- Clickable for details

**Usage**:
```jsx
<GroupCard
  group={groupData}
  onClick={() => navigate(`/group/${groupData.id}`)}
/>
```

---

## Layout Components (`src/components/layout/`)

### Header.jsx
**Purpose**: Page header with title and actions

**Props**:
- `title`: string
- `showBack`: boolean
- `actions`: React node

**Features**:
- Back navigation button
- Custom action buttons
- Responsive sizing

**Usage**:
```jsx
<Header
  title="Dashboard"
  showBack={false}
  actions={<Button>Add</Button>}
/>
```

---

### Sidebar.jsx
**Purpose**: Desktop navigation sidebar

**Props**: None (uses internal state)

**Features**:
- Navigation items
- Active state indication
- Desktop only (hidden on mobile)
- Sticky positioning

**Usage**:
```jsx
<Sidebar />
```

---

### BottomNav.jsx
**Purpose**: Mobile bottom navigation

**Props**: None (uses internal state)

**Features**:
- 3 navigation items
- Active state indication
- Mobile only (hidden on desktop)
- Fixed positioning

**Usage**:
```jsx
<BottomNav />
```

---

### Layout.jsx
**Purpose**: Main layout wrapper combining sidebar and bottom nav

**Props**:
- `children`: React node (required)

**Features**:
- Responsive layout
- Shows sidebar on desktop
- Shows bottom nav on mobile
- Proper spacing for nav elements

**Usage**:
```jsx
<Layout>
  <YourPageContent />
</Layout>
```

---

## Page Components (`src/pages/`)

### Dashboard.jsx
**Purpose**: Main dashboard with balances and recent activity

**Features**:
- Summary cards (owed, owing, net)
- Balance list
- Recent expenses (last 10)
- Add expense modal
- Settle up modal

**Route**: `/dashboard`

**State**:
- `isAddExpenseOpen`: boolean
- `settleUpBalance`: object | null

---

### Groups.jsx
**Purpose**: List all groups

**Features**:
- Group cards
- Add group modal
- Empty state
- Navigation to group details

**Route**: `/`

**State**:
- `isAddGroupOpen`: boolean

---

### GroupDetail.jsx
**Purpose**: Single group view with expenses and balances

**Features**:
- Group info card
- Members list
- Balances for group
- Debt simplification
- Group expenses
- Add expense modal
- Settle up modal

**Route**: `/group/:groupId`

**State**:
- `isAddExpenseOpen`: boolean
- `settleUpBalance`: object | null
- `showSimplified`: boolean

---

### AllExpenses.jsx
**Purpose**: View and search all expenses

**Features**:
- Total summary
- Search functionality
- Filtered expense list
- Add expense modal

**Route**: `/expenses`

**State**:
- `isAddExpenseOpen`: boolean
- `searchQuery`: string

---

## Context (`src/context/`)

### AppContext
**Purpose**: Global state management

**Provides**:
```javascript
{
  // State
  currentUserId: string,
  users: object,
  groups: object,
  expenses: array,
  payments: array,
  
  // Actions
  addExpense: function,
  updateExpense: function,
  deleteExpense: function,
  addGroup: function,
  updateGroup: function,
  deleteGroup: function,
  addUser: function,
  updateUser: function,
  setCurrentUser: function,
  addPayment: function,
}
```

**Usage**:
```jsx
import { useApp } from '@/context';

function MyComponent() {
  const { expenses, addExpense, currentUserId } = useApp();
  // Use state and actions
}
```

---

## Utility Functions (`src/utils/`)

### formatters.js
- `formatCurrency(amount)` - Format as currency
- `formatDate(date)` - Format date string
- `formatRelativeDate(date)` - "2 days ago"
- `toFixed(num, decimals)` - Round to decimals
- `truncateText(text, maxLength)` - Truncate with ellipsis

### validators.js
- `isEmpty(value)` - Check if empty
- `validateRequired(value)` - Require field
- `validateAmount(value)` - Validate number > 0
- `validateSplits(total, splits)` - Validate split totals
- `isValidEmail(email)` - Email validation
- `isValidPercentage(value)` - Percentage validation

### helpers.js
- `generateId()` - Create unique ID
- `calculateSplits()` - Calculate split amounts
- `getCategoryById()` - Get category object
- `filterExpensesByGroup()` - Filter by group
- `filterExpensesByDateRange()` - Filter by dates
- `sortExpensesByDate()` - Sort newest first
- `groupExpensesByDate()` - Group by date
- `calculateTotalExpenses()` - Sum expenses
- `debounce()` - Debounce function

### debtSimplification.js
- `calculateNetBalances()` - Net balances for all
- `simplifyDebts()` - Optimize transactions
- `getUserBalances()` - User-specific balances
- `getTotalOwed()` - Total owed by user
- `getTotalOwing()` - Total owed to user
- `getBalanceSummary()` - Balance summary object

### mockData.js
- `generateMockData()` - Generate sample data

---

## Constants (`src/constants/`)

### routes.js
- Route path constants
- Route helper functions

### theme.js
- Colors, spacing, breakpoints
- Font sizes, shadows, z-indexes

### messages.js
- UI messages and labels
- Error messages
- Placeholders

### config.js
- App configuration
- Split types
- Expense categories
- Pagination settings

---

## Import Patterns

### Using Aliases
```javascript
// Constants
import { ROUTES, LABELS } from '@/constants';

// Components
import { Button, Card } from '@/components/common';
import { ExpenseList } from '@/components/feature';

// Utils
import { formatCurrency, validateAmount } from '@/utils';

// Context
import { useApp } from '@/context';
```

---

## Component Patterns

### Memoization
All components use `React.memo()`:
```javascript
const MyComponent = memo(({ prop1, prop2 }) => {
  // Component logic
});
```

### Callbacks
Use `useCallback` for functions:
```javascript
const handleClick = useCallback(() => {
  // Handle logic
}, [dependencies]);
```

### Computed Values
Use `useMemo` for expensive calculations:
```javascript
const filteredData = useMemo(
  () => data.filter(item => item.active),
  [data]
);
```

---

## Styling Patterns

### Tailwind Classes
```jsx
<div className="flex items-center gap-4 p-4 rounded-lg">
  {/* Content */}
</div>
```

### Conditional Classes
```jsx
<div className={`base-class ${
  isActive ? 'active-class' : 'inactive-class'
}`}>
```

### Dynamic Styles
```jsx
<div style={{ borderLeftColor: categoryColor }}>
```

---

## Testing Components

### Example Test Pattern
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

**Component Reference Complete** ✅

All components are fully documented with props, features, and usage examples!

