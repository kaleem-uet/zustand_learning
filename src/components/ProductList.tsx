import { ProductCard } from "./ProductCard";
const products = [
  {
    id: "1",
    image:
      "https://cdn.pixabay.com/photo/2023/05/08/21/59/tshirt-7979852_1280.jpg",
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life.",
    price: 99.99,
    quantity: 1,
  },
  {
    id: "2",
    image:
      "https://cdn.pixabay.com/photo/2022/12/16/22/11/men-7660590_1280.jpg",
    name: "Smart Watch",
    description:
      "Track your fitness, receive notifications, and stay connected on the go.",
    price: 149.99,
    quantity: 1,
  },
  {
    id: "3",
    image:
      "https://cdn.pixabay.com/photo/2024/05/05/05/34/ai-generated-8740245_1280.jpg",
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with deep bass and 12-hour playtime.",
    price: 59.99,
    quantity: 1,
  },
  {
    id: "4",
    image:
      "https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_1280.jpg",
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with deep bass and 12-hour playtime.",
    price: 59.99,
    quantity: 1,
  },
];
export default function ProductList() {
  return (
    <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}
