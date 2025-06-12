import React from 'react'
import { Link } from "react-router"

interface IMealLink {
  href: string
  children: string
}

export const MealLink = ({ href, children }: IMealLink) => {
  return (
    <Link to={href}>{children}</Link>
  )
}

