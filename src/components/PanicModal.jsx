import React, { useEffect, useState } from 'react'

export default function PanicModal({ show, onClose }) {
  const [count, setCount] = useState(3)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!show) return
    setCount(3)
    setConnected(false)
    const interval = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(interval)
          setConnected(true)
          // initiate phone call to police number
          window.location.href = 'tel:100'
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-sm text-center text-white">
        {!connected ? (
          <>
            <p className="mb-4">Calling Police Helpline...</p>
            <p className="text-3xl font-bold mb-4">{count}</p>
            <button
              className="mt-2 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              onClick={onClose}
            >Cancel</button>
          </>
        ) : (
          <>
            <p className="mb-4">Call Connected</p>
            <button
              className="mt-2 px-4 py-2 bg-green-500 rounded hover:bg-green-600"
              onClick={onClose}
            >Close</button>
          </>
        )}
      </div>
    </div>
  )
}
