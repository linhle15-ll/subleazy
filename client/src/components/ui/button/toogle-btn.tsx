"use client"

import { useState } from "react"


export default function ToggleButton({ option, setOption}: { option: boolean, setOption: (value: boolean) => void }) {
  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setOption(true)}
        className={`p-1 rounded-md transition-all duration-200 ${
          option ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Open
      </button>
      <button
        onClick={() => setOption(false)}
        className={`p-1 text-sm rounded-md transition-all duration-200 ${
          !option ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Resolved
      </button>
    </div>
  )
}