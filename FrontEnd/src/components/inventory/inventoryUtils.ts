
// Helper function to determine status based on stock quantity
export const getProductStatus = (stock: number): string => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "In Stock";
};

// Initial mock data for inventory
export const initialInventoryData = [
  { id: 1, name: "Office Chair Deluxe", category: "Furniture", price: 199.99, stock: 24, status: "In Stock", description: "Comfortable office chair with lumbar support" },
  { id: 2, name: "Standing Desk Pro", category: "Furniture", price: 349.99, stock: 5, status: "Low Stock", description: "Adjustable height standing desk" },
  { id: 3, name: "Wireless Keyboard", category: "Electronics", price: 59.99, stock: 0, status: "Out of Stock", description: "Wireless keyboard with backlight" },
  { id: 4, name: "Ergonomic Mouse", category: "Electronics", price: 39.99, stock: 12, status: "In Stock", description: "Ergonomic wireless mouse" },
  { id: 5, name: "Monitor 27\"", category: "Electronics", price: 299.99, stock: 3, status: "Low Stock", description: "27-inch 4K monitor" },
  { id: 6, name: "Desk Lamp", category: "Office Supplies", price: 29.99, stock: 18, status: "In Stock", description: "Adjustable LED desk lamp" },
  { id: 7, name: "Notebook Set", category: "Stationery", price: 12.99, stock: 42, status: "In Stock", description: "Set of 3 premium notebooks" },
  { id: 8, name: "Whiteboard", category: "Office Supplies", price: 89.99, stock: 7, status: "In Stock", description: "Large magnetic whiteboard" },
  { id: 9, name: "Printer Paper", category: "Stationery", price: 19.99, stock: 2, status: "Low Stock", description: "Premium A4 printer paper, 500 sheets" },
  { id: 10, name: "Filing Cabinet", category: "Furniture", price: 149.99, stock: 0, status: "Out of Stock", description: "Metal filing cabinet with 3 drawers" },
];

// Type definitions
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  description: string;
}
