import React from 'react'
import { Link, type LinkProps } from 'react-router'
import type { Dispatch, SetStateAction, ReactNode } from 'react'
import type { Filter } from '../types/filter'

interface IMealLink extends Omit<LinkProps, 'to'> {
  href: string
  children: ReactNode
  filter?: Filter
  setFilter?: Dispatch<SetStateAction<Filter>>
}

export const MealLink = ({
  href,
  children,
  filter,
  setFilter,
  ...linkProps
}: IMealLink) => {
  const handleClick = () => {
    if (filter && setFilter) {
      setFilter(filter)
    }
  }

  return (
    <Link
      to={href}
      onClick={handleClick}
      className="text-center"
      {...linkProps}
    >
      {children}
    </Link>
  )
}

