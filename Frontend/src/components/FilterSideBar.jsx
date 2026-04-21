import React from 'react'

const FilterSideBar = ({ allProducts }) => {
  const Categories = allProducts.map(p => p.category);
  const uniqueCategories = ["All", ...new Set(Categories)];


  const Brands = allProducts.map(p => p.brand)
  const uniquebrands = ["All", ...new Set(Brands)]
  console.log(Brands);

  return (
    <div>
      Sidebar
    </div>
  )
}

export default FilterSideBar
