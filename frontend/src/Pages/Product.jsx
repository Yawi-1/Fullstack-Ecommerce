import React from 'react'
import all_products from '../Components/Assets/all_product'
import { useContext } from 'react'
import { ShopContext } from '../Components/Context/ShopContext'
import BreadCrumb from '../Components/BreadCrumbs/BreadCrumb'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
const Product = () => {
    const {all_products} = useContext(ShopContext)
    const {productId} = useParams();
    const product = all_products.find(item => item.id === Number(productId));
    return (
        <div>
            <BreadCrumb  product={product}/>
            <ProductDisplay product={product}/>
            <DescriptionBox />
            <RelatedProducts />
        </div>
    )
}

export default Product
