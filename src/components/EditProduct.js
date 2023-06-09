import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProduct } from '../app/app';
import { updateproduct } from '../app/app';

export default function EditProduct() {
  const {id}=useParams();
  const [name, setName]=useState("");
  const [price, setPrice]=useState(0);
  const [checked, setChecked]=useState( false);


  useEffect(()=>{handleGetProductById(id)},[]);

  const handleGetProductById =(id)=>{
    
    getProduct(id).then(resp =>{
      let product =resp.data;
      setName(product.name);
      setPrice(product.price);
      setChecked(product.checked);
    })
  }


  const handleupdateProduct = (event)=>{
    event.preventDefault();
    let product ={id, name, price, checked};
    updateproduct(product).then((resp)=>{
     alert(JSON.stringify(resp.data));
   
    });
  };


  return (
   
    <div className='row p-1'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleupdateProduct}>
              <div className='mb-3'>
                <label className='form-label'> Name :</label>
                 <input 
                 onChange={(e)=>setName(e.target.value)}
                 value={name}
                 className='form-control' id='name'/>
              </div>
              <div className='mb-3'>
                <label 
                 className='form-label'> Price :</label>
                 <input 
                 onChange={(e)=>setPrice(e.target.value)}
                 value={price} className='form-control' id ='price'/>
              </div>
              <div className="form-check">
                 <input
                 onChange={(e)=>setChecked(e.target.value)}
                 checked = {checked}
                 className="form-check-input" type="checkbox" />
                 <label className="form-check-label" htmlFor="flexCheckChecked">
               Checked 
               </label>
               </div>
               <button className='btn btn-success'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
