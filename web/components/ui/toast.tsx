"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle2 className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    info: <AlertCircle className="h-5 w-5" />,
  }

  const colors = {
    success: "border-green-800 bg-green-950/50 text-green-400",
    error: "border-red-800 bg-red-950/50 text-red-400",
    info: "border-blue-800 bg-blue-950/50 text-blue-400",
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 rounded-md border px-4 py-3 shadow-lg transition-all duration-300 ${
        colors[type]
      } ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-2 opacity-70 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: ToastType }>>([])

  const showToast = (message: string, type: ToastType = "success") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const ToastContainer = () => (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  )

  return { showToast, ToastContainer }
}
