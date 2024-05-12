import React, { useContext } from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../Components/Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
const ShopCategory = (props) => {
    const {all_products} = useContext(ShopContext)
    return (
        <div className='shop-category'>
            <img className='shopCategory-banner' src={props.banner} alt="" />
            <div className="shopCategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36
                </p>
                <div className="shopCategorySort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopCategory-products">
                {all_products.map((item,i)=>{
                    if(props.category === item.category){
                        return <Item key={i} item={item} />
                    }
                    else{
                        return null;
                    }
                })}
            </div>
            <div className="shopCategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory
