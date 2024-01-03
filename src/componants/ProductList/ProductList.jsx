"use client"

import { useEffect, useState } from "react"
import ProductCard from "../route/productCard/productCard"

export default function ProductList(){
    const [products,setProducts] = useState([]);
    useEffect(() => {
        fetch("/data/products.json")
        .then(val => val.json())
        .then(products => setProducts(products))        
    },[])
    return (
        <div className="grid grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard data={product} />
          ))}
        </div>
    );   
}