import React from 'react'
import { Link } from "react-router"

interface IMealLink {
  href: string
  children: string
}

export const MealLink = ({ href, children }: IMealLink) => {
  return (
    <Link to={href} className="block text-center font-bold bg-amber-100 rounded-lg p-4 h-full text-lg font-sans text-amber-900 transition transform hover:-translate-y-1 hover:bg-amber-200 hover:text-amber-700">
      {children}
    </Link>
  )
}

