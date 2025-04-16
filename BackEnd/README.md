# 🏪 Shop Management System – Backend API (Django + DRF + JWT)

A full-featured backend API for managing small to medium retail businesses.  
Built with Django REST Framework + JWT, ready for React frontend integration.

---

## ✅ Features

- 🔐 **Authentication** – JWT with admin/staff roles
- 📦 **Inventory** – Product, category & stock control
- 🧾 **Sales** – POS logic with invoices, sale items
- 👤 **Customers** – Profiles & purchase history
- 💸 **Loans** – Credit tracking & repayment logs
- 🏷️ **Expenses** – Operational cost management
- 🚚 **Suppliers** – Vendor and purchase tracking

---

## 🧱 Project Structure

```txt
shop_management/
├── accounts/         # JWT Auth, roles
├── inventory/        # Products, Categories, StockEntry
├── sales/            # Sales, SaleItems
├── customers/        # Customer profiles
├── expenses/         # Expense, ExpenseCategory
├── loans/            # Loan, Repayment
├── suppliers/        # Supplier, Purchase
├── shop_management/  # Settings & root URLs
└── manage.py
```

---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/DulshanRerg/shop-management.git
   cd shop-management
   ```

2. **Create & activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install requirements**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure `.env` or `settings.py`**
   - Use PostgreSQL or SQLite (dev)
   - Add email backend if using password reset

5. **Apply migrations & run server**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

---

## 🔑 Auth Endpoints (JWT)

| Endpoint                  | Method | Description     |
|---------------------------|--------|-----------------|
| `/api/accounts/register/` | POST   | Create user     |
| `/api/accounts/login/`    | POST   | Get tokens      |
| `/api/accounts/refresh/`  | POST   | Refresh token   |
| `/api/accounts/profile/`  | GET    | Get user info   |

---

## 📦 Inventory

| Endpoint                         | Description          |
|----------------------------------|----------------------|
| `/api/inventory/products/`       | CRUD Products        |
| `/api/inventory/categories/`     | CRUD Categories      |
| `/api/inventory/stock-entries/`  | Log restocks         |

---

## 🧾 Sales

| Endpoint                  | Description            |
|---------------------------|------------------------|
| `/api/sales/sales/`       | Create/View sales      |

---

## 👤 Customers

| Endpoint                     | Description         |
|------------------------------|---------------------|
| `/api/customers/customers/`  | CRUD Customers      |

---

## 💸 Loans

| Endpoint                      | Description          |
|-------------------------------|----------------------|
| `/api/loans/loans/`           | Track customer debts |
| `/api/loans/repayments/`      | Record repayments    |

---

## 🏷️ Expenses

| Endpoint                           | Description         |
|------------------------------------|---------------------|
| `/api/expenses/expenses/`          | CRUD Expenses       |
| `/api/expenses/categories/`        | Expense Categories  |

---

## 🚚 Suppliers

| Endpoint                          | Description              |
|-----------------------------------|--------------------------|
| `/api/suppliers/suppliers/`       | Manage vendors           |
| `/api/suppliers/purchases/`       | Log purchase restocks    |

---

## 📦 Developer Information

| Role             | Name                     |
|------------------|--------------------------|
| Author           | **Abdul Shaban Rajabu**  |
| Email            | dulshanrerg01@duck.com   |
| License          | MIT                      |       

Contributions welcome — fork, feature, PR, done!

---

## 🧪 Testing API with Postman

Use this JSON Postman schema to test all API routes:
👉 `postman_shop_management.json`

Import it in Postman or Insomnia and start testing with real JWT tokens.

---

## 🧬 Database ERD Diagram

![ERD Diagram](docs/shop_management_erd.png)

Includes relationships for:
- Products ↔ Categories ↔ Purchases ↔ Suppliers
- Sales ↔ SaleItems ↔ Products
- Customers ↔ Sales ↔ Loans ↔ Repayments

---

## 🧠 Built With

- Django 4+
- Django REST Framework
- Simple JWT
- PostgreSQL (or SQLite dev)
```

---