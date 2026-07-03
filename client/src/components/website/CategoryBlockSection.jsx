import React from 'react'
import { categories } from '@/api-calls/product/'
import CategoryBlock from '@/components/website/CategoryBlock'

function CategoryBlockSection() {
  return (
      <div className="max-w-7xl mx-auto p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <CategoryBlock key={c.id} block={c} />
          ))}
        </div>
  )
}

export default CategoryBlockSection
