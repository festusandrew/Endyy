import { Product, ProductCategory, DeliveryMethod } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'hero-1',
    name: 'Cherry Choco Bliss',
    category: ProductCategory.CUPCAKE,
    price: 4500,
    description: 'A rich chocolate cupcake topped with vanilla buttercream, chocolate drizzle, and a maraschino cherry.',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    ingredients: ['Dark Chocolate', 'Buttercream', 'Cherry', 'Flour', 'Sugar'],
    calories: 380,
    availableMethods: [DeliveryMethod.DELIVERY, DeliveryMethod.PICKUP]
  },
  {
    id: '1',
    name: 'Blueberry Bliss Cake',
    category: ProductCategory.CAKE,
    price: 45000,
    description: 'A three-layer vanilla sponge infused with fresh blueberries and covered in our signature frosting.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1000&auto=format&fit=crop', 
    popular: true,
    ingredients: ['Flour', 'Eggs', 'Blueberries', 'Cream Cheese', 'Sugar'],
    calories: 450,
    availableMethods: [DeliveryMethod.DELIVERY, DeliveryMethod.PICKUP]
  },
  {
    id: '2',
    name: 'Royal Chocolate Fudge',
    category: ProductCategory.CAKE,
    price: 55000,
    description: 'Decadent dark chocolate cake with ganache filling. A royal treat for chocolate lovers.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    ingredients: ['Dark Chocolate', 'Cocoa Powder', 'Butter', 'Eggs', 'Flour'],
    calories: 520,
    availableMethods: [DeliveryMethod.PICKUP] // Pickup only due to delicate nature
  },
  {
    id: '3',
    name: 'Morning Berry Parfait',
    category: ProductCategory.YOGURT,
    price: 8500,
    description: 'Greek yogurt layered with house-made granola, honey, and seasonal mixed berries.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop',
    popular: false,
    ingredients: ['Greek Yogurt', 'Granola', 'Honey', 'Strawberries', 'Blueberries'],
    calories: 280,
    availableMethods: [DeliveryMethod.DELIVERY, DeliveryMethod.PICKUP]
  },
  {
    id: '4',
    name: 'Vanilla Bean Cupcake',
    category: ProductCategory.CUPCAKE,
    price: 4000,
    description: 'Classic fluffy vanilla cupcake topped with a swirl of buttercream.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    ingredients: ['Vanilla Bean', 'Flour', 'Butter', 'Sugar', 'Milk'],
    calories: 320,
    availableMethods: [DeliveryMethod.DELIVERY, DeliveryMethod.PICKUP]
  },
  {
    id: '5',
    name: 'Pink Velvet Kiss',
    category: ProductCategory.CUPCAKE,
    price: 3500,
    description: 'Soft pink velvet sponge with a sweet cream cheese frosting and sprinkles.',
    image: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    ingredients: ['Cocoa', 'Butter', 'Sugar', 'Eggs', 'Cream Cheese'],
    calories: 310,
    availableMethods: [DeliveryMethod.DELIVERY, DeliveryMethod.PICKUP]
  },
  {
    id: '6',
    name: 'Mango Tango Parfait',
    category: ProductCategory.YOGURT,
    price: 9000,
    description: 'Tropical mango puree swirled with coconut yogurt and chia seeds.',
    image: 'https://images.unsplash.com/photo-1638302821102-171b78298711?q=80&w=1000&auto=format&fit=crop',
    popular: false,
    ingredients: ['Mango', 'Coconut Yogurt', 'Chia Seeds', 'Agave'],
    calories: 250,
    availableMethods: [DeliveryMethod.DELIVERY, DeliveryMethod.PICKUP]
  },
  {
    id: '7',
    name: 'Ocean Velvet Cake',
    category: ProductCategory.CAKE,
    price: 60000,
    description: 'Our signature blue velvet cake. Moist, fluffy, and visually stunning for any event.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1000&auto=format&fit=crop',
    popular: false,
    ingredients: ['Cocoa', 'Buttermilk', 'Blue Food Coloring', 'Vinegar', 'Flour'],
    calories: 480,
    availableMethods: [DeliveryMethod.PICKUP] // Pickup only due to delicate nature
  },
  {
    id: '8',
    name: 'Caramel Crunch',
    category: ProductCategory.CUPCAKE,
    price: 4500,
    description: 'Rich caramel sponge injected with salted caramel sauce.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    ingredients: ['Caramel', 'Sea Salt', 'Flour', 'Eggs', 'Butter'],
    calories: 350,
    availableMethods: [DeliveryMethod.DELIVERY, DeliveryMethod.PICKUP]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    text: "The Cherry Choco Bliss was the highlight of my son's birthday! Absolutely delicious.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    text: "Ordered parfaits for the office meeting. Fresh, healthy, and delivered right on time.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily R.",
    text: "The delivery was seamless and the packaging is so premium. Highly recommend!",
    rating: 4
  }
];