"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
    tag: "New",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
    tag: "Bestseller",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    tag: "Sale",
  },
  {
    id: 4,
    name: "VR Headset",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    tag: "Hot",
  },
];

const CART_KEY = "storefront_cart";

export default function Storefront() {
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Close cart dropdown on outside click
  useEffect(() => {
    if (!cartOpen) return;
    function handleClick(e: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [cartOpen]);

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const idx = prev.indexOf(id);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  // Get cart items with quantity
  const cartItems = products
    .map((product) => {
      const quantity = cart.filter((id) => id === product.id).length;
      return quantity > 0 ? { ...product, quantity } : null;
    })
    .filter(Boolean) as (typeof products[0] & { quantity: number })[];

  const cartCount = cart.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">TechStore</span>
          <Badge variant="secondary" className="ml-2">Demo</Badge>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#" className="text-gray-700 hover:text-black font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-black font-medium">Products</a>
          <a href="#" className="text-gray-700 hover:text-black font-medium">Contact</a>
        </nav>
        <div className="relative" ref={cartRef}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setCartOpen((open) => !open)}
            aria-label="Open cart"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Button>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
          {/* Cart Dropdown */}
          {cartOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-20 min-h-[100px]">
              <h3 className="font-bold text-lg mb-2">Cart</h3>
              {cartItems.length === 0 ? (
                <div className="text-gray-500 text-sm">Your cart is empty.</div>
              ) : (
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative">
                          <Image
                            src={item.image.replace("/public", "")}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">x{item.quantity}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-600">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove from cart"
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {cartItems.length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-blue-700 text-lg">
                    ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col items-center p-4 group hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 mb-4 relative">
                <Image
                  src={product.image.replace("/public", "")}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold">{product.name}</span>
                <Badge>{product.tag}</Badge>
              </div>
              <span className="text-xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</span>
              <Button onClick={() => addToCart(product.id)} className="w-full mt-auto">Add to Cart</Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
