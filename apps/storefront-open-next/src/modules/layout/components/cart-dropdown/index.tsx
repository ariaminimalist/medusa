"use client"

import { convertToLocale } from "@lib/util/money"
import { deleteLineItem, updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { Spinner } from "@medusajs/icons"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const CartDrawer = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [open, setOpen] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems)
  const pathname = usePathname()

  // Auto-open when an item is added to the cart
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      setOpen(true)
    }
    itemRef.current = totalItems
  }, [totalItems, pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleQuantityChange = async (lineId: string, quantity: number) => {
    if (quantity < 1) return
    setUpdatingId(lineId)
    await updateLineItem({ lineId, quantity }).finally(() =>
      setUpdatingId(null)
    )
  }

  const handleDelete = async (lineId: string) => {
    setDeletingId(lineId)
    await deleteLineItem(lineId).finally(() => setDeletingId(null))
  }

  const sortedItems = cartState?.items
    ? [...cartState.items].sort((a, b) =>
        (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
      )
    : []

  return (
    <>
      {/* Cart trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 hover:text-gray-900 transition-colors text-sm"
        data-testid="nav-cart-link"
        aria-label="Open cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <span>
          Cart
          {totalItems > 0 && (
            <span className="ml-1 bg-gray-900 text-white text-xs rounded-full w-4 h-4 inline-flex items-center justify-center leading-none">
              {totalItems}
            </span>
          )}
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full xsmall:w-[400px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="nav-cart-dropdown"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1"
            aria-label="Close cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        {sortedItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 flex flex-col gap-5">
              {sortedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4"
                  data-testid="cart-item"
                >
                  {/* Thumbnail */}
                  <LocalizedClientLink
                    href={`/products/${item.product_handle}`}
                    onClick={() => setOpen(false)}
                    className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border border-gray-100"
                  >
                    <Thumbnail
                      thumbnail={item.thumbnail}
                      images={item.variant?.product?.images}
                      size="square"
                    />
                  </LocalizedClientLink>

                  {/* Details */}
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <LocalizedClientLink
                        href={`/products/${item.product_handle}`}
                        onClick={() => setOpen(false)}
                        className="text-sm font-semibold text-gray-900 leading-snug hover:text-gray-700 truncate"
                        data-testid="product-link"
                      >
                        {item.title}
                      </LocalizedClientLink>
                      {/* Remove button */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                        aria-label="Remove item"
                        data-testid="cart-item-remove-button"
                      >
                        {deletingId === item.id ? (
                          <Spinner className="animate-spin h-4 w-4" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    <LineItemOptions
                      variant={item.variant}
                      data-testid="cart-item-variant"
                    />

                    <div className="flex items-center justify-between mt-auto pt-1">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={
                            item.quantity <= 1 || updatingId === item.id
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors text-lg leading-none"
                          data-testid="cart-item-decrement"
                        >
                          −
                        </button>
                        <span
                          className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-900"
                          data-testid="cart-item-quantity"
                          data-value={item.quantity}
                        >
                          {updatingId === item.id ? (
                            <Spinner className="animate-spin h-3 w-3" />
                          ) : (
                            item.quantity
                          )}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={updatingId === item.id}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors text-lg leading-none"
                          data-testid="cart-item-increment"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-sm font-semibold text-gray-900">
                        <LineItemPrice
                          item={item}
                          style="tight"
                          currencyCode={cartState!.currency_code}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Subtotal{" "}
                  <span className="text-xs text-gray-400">(excl. taxes)</span>
                </span>
                <span
                  className="text-base font-bold text-gray-900"
                  data-testid="cart-subtotal"
                  data-value={subtotal}
                >
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: cartState!.currency_code,
                  })}
                </span>
              </div>

              <LocalizedClientLink href="/checkout" onClick={() => setOpen(false)}>
                <button
                  className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
                  data-testid="go-to-cart-button"
                >
                  Checkout
                </button>
              </LocalizedClientLink>

              <button
                onClick={() => setOpen(false)}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900 mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-gray-500">
                Add some products to get started.
              </p>
            </div>
            <LocalizedClientLink href="/store" onClick={() => setOpen(false)}>
              <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
