import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import useCartStore from "@/stores/cartStore";

interface ProductCardSheetProps {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
}
export function ProductCardSheet({ sheetOpen, setSheetOpen }: ProductCardSheetProps) {
  const [tab, setTab] = useState<"cart" | "favorite">("cart");

  const {
    cartItems: items,
    removeFromCart,
    favorites,
    removeFromFavorites,
  } = useCartStore();

  // Helper for total with fallback
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="bg-white z-50 px-0 py-0 max-w-md w-full">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Cart & Favorites</SheetTitle>
          <SheetDescription>
            View and manage your shopping cart and favorite items.
          </SheetDescription>
          <div className="flex gap-2 mt-4">
            <Button
              variant={tab === "cart" ? "default" : "outline"}
              onClick={() => setTab("cart")}
              className="flex-1"
            >
              Cart
            </Button>
            <Button
              variant={tab === "favorite" ? "default" : "outline"}
              onClick={() => setTab("favorite")}
              className="flex-1"
            >
              Favorites
            </Button>
          </div>
        </SheetHeader>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {tab === "cart" ? (
            items.length > 0 ? (
              <>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b pb-2 gap-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md bg-muted"
                      />
                      <div className="flex-1 min-w-0 ml-2">
                        <div className="font-medium truncate">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} x {item.quantity ?? 1}
                        </div>
                      </div>
                      <div className="font-semibold whitespace-nowrap">
                        ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </Button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-6 border-t pt-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-10">
                Your cart is empty.
              </div>
            )
          ) : favorites.length > 0 ? (
            <ul className="space-y-4">
              {favorites.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2 gap-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md bg-muted"
                  />
                  <div className="flex-1 min-w-0 ml-2">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromFavorites(item.id)}
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              No favorite items.
            </div>
          )}
        </div>
        <SheetFooter className="px-6 pb-6">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
