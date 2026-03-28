"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOrderModalOpen: boolean;
  preSelectedModel: string;
  preSelectedProduct: string;
  openOrderModal: (model?: string, product?: string) => void;
  closeOrderModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [preSelectedModel, setPreSelectedModel] = useState("");
  const [preSelectedProduct, setPreSelectedProduct] = useState("");

  const openOrderModal = (model = "", product = "") => {
    setPreSelectedModel(model);
    setPreSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setPreSelectedModel("");
    setPreSelectedProduct("");
  };

  return (
    <ModalContext.Provider
      value={{ isOrderModalOpen, preSelectedModel, preSelectedProduct, openOrderModal, closeOrderModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}
