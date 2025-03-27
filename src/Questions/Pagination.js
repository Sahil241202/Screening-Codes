import React, { useEffect, useState } from 'react'
import './Pagination.css'

function Pagination() {

    const PAGE_SIZE = 10;

    const ProductCard = ({image,title}) => {
        return(
            <div className='product-card'>
                <img className='product-img' src={image} alt={title} />
                <span>{title}</span>
            </div>
        )
    }

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts/PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePage = (n) => {
    setCurrentPage(n);
}

const handleLeft = () => {
    setCurrentPage((prev) => prev - 1);
}

const handleRight = () => {
    setCurrentPage((prev) => prev + 1);
}

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <h1>Welcome to our Store</h1>
      <h2>A best place to get you all the things</h2>

      <div className='products-container'>
        {products.slice(start,end).map((p) => <ProductCard  image={p.thumbnail} title={p.title}/>)}
      </div>
      <div className='pages'>
        <button disabled={currentPage===0} onClick={()=> handleLeft()}>◀️</button>
        {[...Array(totalPages).keys()].map((n) =>(
            <button className={"page-number" + (currentPage===n ? "active" : "")} onClick={() => {handlePage(n)}}> {n} </button>
        ))}
        <button disabled={currentPage===totalPages-1} onClick={() => handleRight()}>▶️</button>
      </div>
    </div>
  )
}

export default Pagination
