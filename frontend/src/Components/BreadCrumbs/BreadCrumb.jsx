import React from 'react'
import './BreadCrumb.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Link } from 'react-router-dom'
const BreadCrumb = (props) => {
    const {product} = props;
    return (
        <div className='breadcrumb'>
           <Link to='/'>SHOP</Link> 
            <img src={arrow_icon} alt="" />
            {/* SHOP<img src={arrow_icon} alt="" /> */}
           <Link to={`/${product.category}s`}>{product.category}</Link> 
            <img src={arrow_icon} alt="" />
            {product.name}
        </div>
    )
}

export default BreadCrumb
