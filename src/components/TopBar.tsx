import React, { ReactNode, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { ProductCardSheet } from "./CartSheet";

interface TopBarProps {
  favoriteCount?: number;
  cartCount?: number;
  children?: ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ favoriteCount = 0, cartCount = 0, children }) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  return (
    <header className="w-full bg-white dark:bg-card shadow-sm py-3 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 border-b border-border">
      {/* Logo */}
      <span className="text-xlfont-bold text-primary select-none mr-auto">
        ShopCart
      </span>
      <div className="flex items-center gap-6">
        {children}
        <div className="relative" onClick={() => setSheetOpen((prev) => !prev)}>
          <Heart className="w-7 h-7 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          {favoriteCount > 0 && (
            <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-2 -right-2">
              {favoriteCount > 99 ? "99+" : favoriteCount}
            </span>
          )}
        </div>
        <div className="relative" onClick={() => setSheetOpen((prev) => !prev)}>
          <ShoppingCart className="w-7 h-7 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          {cartCount > 0 && (
            <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-2 -right-2">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </div>
      </div>
      <ProductCardSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
    </header>
  );
}; 