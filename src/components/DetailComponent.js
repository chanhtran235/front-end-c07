
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {getProductById} from "../services/productService";

function DetailComponent() {

    const [product, setProduct] = useState({id: "", name: ""})

    const {id} = useParams();// useLocal() => truyền một đối tượng

    useEffect(()=>{
        console.log(" -         useEffect detail------------")
        const fetData = async  ()=>{
            let p = await getProductById(id)
            setProduct(p)
        }
        fetData();
    },[])
    return (
        <>
            {console.log("-------detail-----------")}
          <h3> Chi tiết</h3>
            <p>ID: {product.id}</p>
            <p>Name:{product.name} </p>
        </>
    )


}
export default DetailComponent ;