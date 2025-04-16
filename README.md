# Backend

```markdown
# Shop Management System - Backend

This is the backend of the Shop Management System, built with Django and Django REST Framework. It provides APIs for managing inventory, sales, customers, expenses, debts, suppliers, and user authentication.

## Features
- User authentication with JWT (JSON Web Tokens)
- Inventory management
- Sales tracking
- Customer management
- Expense tracking
- Debt and supplier management
- RESTful API endpoints

## Requirements
- Python 3.10+
- Django 5.1+
- Django REST Framework
- PostgreSQL (or SQLite for development)
```
## Installation

1. Clone the repository:
   ```bash
   git clone github.com/DulshanRerg/Shop-Information-Management-System
   cd BackEnd
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   .\venv\Scripts\activate   # On Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Run the development server:
   ```bash
   python manage.py runserver
   ```

## API Endpoints
- **Authentication**
  - `POST /api/accounts/register/` - Register a new user
  - `POST /api/accounts/login/` - Login and obtain JWT tokens
  - `POST /api/accounts/refresh/` - Refresh access token
- **User**
  - `GET /api/accounts/user/` - Get current user details
- **Other Endpoints**
  - Inventory, sales, customers, expenses, debts, and suppliers (see API documentation)

## Environment Variables
Create a `.env` file in the `BackEnd` directory with the following variables:
```env
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## Testing
Run tests using:
```bash
python manage.py test
```

## CORS Configuration
Ensure the frontend URL is added to `CORS_ALLOWED_ORIGINS` in `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:8081",
]
```

## License
This project is licensed under the MIT License.

======================================================================================================================================================================


# Frontend

```markdown
# Shop Management System - Frontend

This is the frontend of the Shop Management System, built with React, Vite, and TypeScript. It provides a user-friendly interface for managing inventory, sales, customers, expenses, debts, and suppliers.

## Features
- User authentication with JWT
- Responsive design with Tailwind CSS
- Integration with the backend API
- Dashboard for managing shop operations

## Requirements
- Node.js 18+
- npm or yarn
```
## Installation

1. Clone the repository:
   ```bash
   git clone github.com/DulshanRerg/Shop-Information-Management-System
   cd FrontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:8080
   ```

## Environment Variables
Create a `.env` file in the `FrontEnd` directory with the following variables:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Folder Structure
- `src/api/` - API service files (e.g., `authService.ts`, `customerService.ts`)
- `src/components/` - Reusable UI components
- `src/pages/` - Page components (e.g., Login, Register, Dashboard)
- `src/hooks/` - Custom React hooks
- `src/styles/` - Global styles and Tailwind CSS configuration

## Scripts
- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check for code issues

## Authentication
The app uses JWT for authentication. Tokens are stored in `localStorage` and attached to API requests via the `Authorization` header.

## Testing
Run tests using:
```bash
npm test
```

## License
This project is licensed under the MIT License.
