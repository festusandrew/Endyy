# Endyy's Patisserie

A modern, responsive e-commerce web application for a bakery and patisserie, built with React, TypeScript, and Tailwind CSS. The application features a comprehensive product catalog, a seamless shopping cart experience with delivery and pickup options, and an integrated AI-powered baking assistant.

## Features

- **Product Catalog:** Browse a variety of baked goods including Cakes, Cupcakes, Yogurt Parfaits, and professional Training Classes.
- **Shopping Cart:** Add items to your cart, update quantities, and remove items. The cart calculates subtotals and dynamically updates based on the selected delivery method.
- **Delivery vs. Store Pickup:** Toggle between "Delivery" and "Store Pickup" methods. The application dynamically filters available products based on the selected method and automatically calculates delivery fees (e.g., +₦1,500 for delivery).
- **AI Baking Assistant:** An integrated chatbot (`GeminiBaker`) powered by the Google Gemini API to answer baking questions, provide recipe recommendations, and assist customers.
- **Responsive Design:** Fully responsive layout optimized for both mobile and desktop devices, featuring a mobile-friendly navigation menu and cart sidebar.

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **AI Integration:** Google GenAI SDK (`@google/genai`)
- **Build Tool:** Vite

## Project Structure

```
/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Main navigation header
│   ├── Footer.tsx       # Site footer
│   ├── CartSidebar.tsx  # Slide-out shopping cart
│   └── GeminiBaker.tsx  # AI baking assistant chatbot
├── pages/               # Page-level components
│   ├── Home.tsx         # Landing page with featured products
│   ├── Shop.tsx         # Full product catalog with category filters
│   ├── ProductDetail.tsx# Individual product details and availability
│   ├── About.tsx        # About the bakery
│   ├── Contact.tsx      # Contact information and form
│   └── Training.tsx     # Details about baking classes
├── services/            # External API integrations (e.g., Gemini API)
├── App.tsx              # Main application routing and state management
├── constants.ts         # Mock data for products and categories
├── types.ts             # TypeScript interfaces and enums
└── index.css            # Global CSS and Tailwind directives
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd endyys-patisserie
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

To enable the AI Baking Assistant (`GeminiBaker`), you need to provide a Google Gemini API key.

1. Create a `.env` file in the root directory.
2. Add your API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
*(Note: In the AI Studio environment, the API key may be provided automatically via `process.env.GEMINI_API_KEY` depending on the backend setup, but for local Vite development, use the `VITE_` prefix if accessing from the client).*

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be output to the `dist/` directory.

## Key Components

- **`App.tsx`**: Manages the global state for the shopping cart (`cartItems`) and the selected delivery method (`deliveryMethod`). It passes these states down to the `Shop`, `ProductDetail`, and `CartSidebar` components.
- **`Shop.tsx`**: Displays the product grid. It filters products based on the active category and the globally selected delivery method.
- **`CartSidebar.tsx`**: A slide-out drawer that displays the user's selected items, calculates the subtotal, adds delivery fees if applicable, and provides a checkout button.
- **`constants.ts`**: Contains the `products` array, which defines each item's ID, name, price, description, image, category, and `availableMethods` (Delivery, Pickup, or both).

## License

This project is proprietary and created for Endyy's Patisserie.
