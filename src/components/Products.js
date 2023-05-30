import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faCircle, faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons"
//import axios from 'axios'
import { deleteProduct, getProducts, checkProduct, AppContext } from '../app/app';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';

export default function Products() {

  const [query, setQuery] = useState('');
  const navigate =useNavigate();


  const [state, setState] = useContext(AppContext);


  useEffect(() => { handleGetProducts(state.keyword, state.currentPage, state.pageSize); }, []
  );

  const handleGetProducts = (keyword, page, size) => {


    getProducts(keyword, page, size).then((resp) => {
      let totalElements = resp.headers['x-total-count'];
      let totalPages = Math.floor(totalElements / size);
      if (totalElements % size != 0) ++totalPages;
      setState({ ...state, products: resp.data, keyword: keyword, currentPage: page, pageSize: size, totalPages: totalPages });
    }).catch((err) => { console.log(err) });

  };

  const handleDeleteProduct = (product) => {
    deleteProduct(product).then((resp) => {
      // handleGetProducts();
      const newProduct = state.products.filter((p) => p.id !== product.id);
      setState({ ...state, products: newProduct });
    });

  };

  const handleCheckProduct = (product) => {
    checkProduct(product).then((resp) => {

      const newProducts = state.products.map((p) => {
        if (p.id === product.id) {
          p.checked = !p.checked;
        }


        return p;
      }
      );

      setState({ ...state, products: newProducts });
    })
  };

  const handleGoTopage = (page) => {
    handleGetProducts(state.keyword, page, state.pageSize);
  };


  const handleSearch = (event) => {
    event.preventDefault();
    // console.log(query);
    console.log(state.keyword);
    // setState({ ...state, keyword : query});
    handleGetProducts(query, 1, state.pageSize);
    console.log(state.keyword);
  };



  return (
    <div className='p-1 m-1 ' >
      <div className='row'>
        <div className='col-md-6'>
          <div className='card m-1'>
            <div className='card-body'>
              <SearchForm handleSearch ={handleSearch} query={query}  setQuery= {setQuery}> </SearchForm>
            </div>
          </div>
          <div className='card m-1'>

            <div className='card-body '>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    state.products.map((produit) => (
                      <tr key={produit.id}>
                        <td> {produit.id}</td>
                        <td> {produit.name}</td>
                        <td> {produit.price}</td>
                        <td>
                          <button onClick={() => handleCheckProduct(produit)} className='btn btn-outline-success'>
                            <FontAwesomeIcon icon={produit.checked ? faCheckCircle : faCircle}>

                            </FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button onClick={() => handleDeleteProduct(produit)} className='btn btn-outline-danger'>
                            <FontAwesomeIcon icon={faTrash}> </FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button onClick={()=>navigate(`/editproduct/${produit.id}`)}className='btn btn-outline-success'>
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                          </button>
                        </td>
                      </tr>
                    ))
                  }



                </tbody>
              </table>
              <ul className='nav nav-pills'>
                {
                  (new Array(state.totalPages).fill(0).map(
                    (v, index) => (
                      <li key={index+1}>
                        <button onClick={() => handleGoTopage(index + 1)} className={index + 1 === state.currentPage ? 'btn btn-info ms-1' : 'btn btn-outline-info ms-1'}> {index + 1} </button>
                      </li>
                    )
                  ))

                }
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
