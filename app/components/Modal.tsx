"use client";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="main_modal" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="modal_close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
