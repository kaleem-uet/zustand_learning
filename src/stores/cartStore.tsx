import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity?: number;
}

interface CartStoreState {
  cartItems: Product[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getFavoritesCount: () => number;
  isInCart: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  getCartItem: (productId: string) => Product | undefined;
}

const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      favorites: [],
      
          addToCart: (product: Product) => {
          console.log("this is product quantity",product.quantity);
          
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            cartItems: cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item?.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cartItems: [...cartItems, { ...product, quantity: 1 }],
          });
        }
      },
      removeFromCart: (productId: string) => {
        const { cartItems } = get();
        set({
          cartItems: cartItems.filter((item) => item.id !== productId),
        });
      },
      // Favorites actions
      addToFavorites: (product) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some(
          (item) => item.id === product.id
        );

        if (!isAlreadyFavorite) {
          set({
            favorites: [...favorites, product],
          });
        }
      },
      removeFromFavorites: (productId: string) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter((item) => item.id !== productId),
        });
      },
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, item) => total + item.price * (item.quantity ?? 1),
          0
        );
      },
      getCartItemsCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + (item.quantity ?? 1), 0);
      },
      getFavoritesCount: () => {
        const { favorites } = get();
        return favorites.length;
      },
      isInCart: (productId) => {
        const { cartItems } = get();
        return cartItems.some((item) => item.id === productId);
      },
      isFavorite: (productId) => {
        const { favorites } = get();
        return favorites.some((item) => item.id === productId);
      },
      getCartItem: (productId) => {
        const { cartItems } = get();
        return cartItems.find((item) => item.id === productId);
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage key
      partialize: (state: CartStoreState) => ({
        cartItems: state.cartItems,
        favorites: state.favorites,
      }),
    }
  )
);
export default useCartStore;