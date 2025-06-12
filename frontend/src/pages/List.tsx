// components/GenericList.tsx
import React from 'react'

export interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  listClassName?: string
  itemClassName?: string
}

export function List<T>({
  items,
  renderItem,
  listClassName = '',
  itemClassName = '',
}: ListProps<T>) {
  return (
    <ul className={listClassName}>
      {items.map((item, idx) => (
        <li key={idx} className={itemClassName}>
          {renderItem(item, idx)}
        </li>
      ))}
    </ul>
  )
}

