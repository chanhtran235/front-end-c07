import React, {useEffect, useRef, useState} from "react";
import {deleteProductById, getAllProduct, searchProductByName} from "../services/productService";
import {Link} from "react-router-dom"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import {getAllManufacture} from "../services/manufactureService";
function ListComponent() {
    const account = useSelector(state =>state.user.account );
    const [productList , setProductList] = useState([]);
    const [manufactureList , setManufactureList] = useState([]);
    const [show,setShow] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [deleteProduct,setDeleteProduct] = useState({id: "", name: ""});
    const searchRef = useRef();
    const searchManufactureIdRef = useRef();
    useEffect( ()=>{
        console.log("------- userEffec run ----------------------")
        const fetchData = async ()=>{
            const list =  await getAllProduct();
            setProductList(list);
        }
        const fetchDataManufac = async ()=>{
            const  list = await getAllManufacture()
            setManufactureList(list);
        }
        fetchData();
        fetchDataManufac();

    },[isLoading]);

    const handleClose =()=>{
        setShow((pre) => !pre);
    }
    const handleShow =(product)=>{
           setShow((pre) => !pre);
           setDeleteProduct(product);


    }
    const handleDelete =async ()=>{
        await deleteProductById(deleteProduct.id);
        setIsLoading((pre) =>!pre);
        handleClose();
    }
    const handleSearch =()=>{
        let name = searchRef.current.value;
        let manufactureId = searchManufactureIdRef.current.value;
        const fetchData = async ()=>{
            const searchList = await searchProductByName(name,manufactureId);
            setProductList(searchList);
        }
        fetchData();
    }
    return (
        <>
            {console.log("----------list render ----------------")}
            <h3>Product List</h3>
            <div className={'row justify-content-between mb-5 mt-5'}>
                <Link className={'w-25 btn btn-sm btn-primary'} to={'/products/create'}>Add new Product</Link>
                <form className={'w-75 row justify-content-end'}>
                    <input className={'w-25'} ref={searchRef} name={'searchName'} placeholder={'Enter search name'}/>
                    <select ref={searchManufactureIdRef} className={'w-25'}>
                        <option value={""}>------chon------</option>
                        {manufactureList.map(e=>(
                            <option value={e.id}>{e.name}</option>
                        ))}

                    </select>
                    <button onClick={handleSearch} className={' w-25 btn btn-success btn-sm'} type={'button'} >Search</button>
                </form>
            </div>

            <table className={'table table-dark'}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Sim</th>
                    <th>Feature</th>
                    <th>Manufacture</th>
                    <th>Detail</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {productList.map((p,i)=>(
                    <tr key={p.id}>
                        <td>{i+1}</td>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.sim}</td>
                        <td>{p.feature}</td>
                        <td>{p.manufacture.name}</td>
                        <td>
                            <Link to={'/products/detail/'+p.id} className={'btn btn-secondary btn-sm'}>Detail</Link>
                        </td>
                        <td>
                            {account&&((account.role=="ADMIN")?<Button className={'btn-sm btn-danger'} variant="danger" onClick={()=>{
                                handleShow(p);
                            }}>
                                Delete
                            </Button> :'')}

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xoá {deleteProduct.name}???</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
export default ListComponent ;