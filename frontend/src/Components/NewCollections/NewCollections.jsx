import React from 'react'
import './NewCollections.css'
import new_collections from '../Assets/new_collections.js'
import Item from '../Item/Item'
const NewCollections = () => {
    return (
        <div className='newCollections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
             {new_collections.map((item,index)=>{
                return <Item key={index} item={item}/>
             })}
            </div>
        </div>
    )
}

export default NewCollections
