import ProductList from "./components/ProductList";
import { TopBar } from "./components/TopBar";
import useCartStore from "./stores/cartStore";
function App() {
const { getCartItemsCount, getFavoritesCount } = useCartStore();

  return (
    <>
      <TopBar
        favoriteCount={getFavoritesCount()}
        cartCount={getCartItemsCount()}
      />
      <ProductList />
    </>
  );
}

export default App;
