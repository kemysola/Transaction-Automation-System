import React, { useRef, useState, useEffect } from 'react';
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Product from "./ProductMode";


const ListWrapper = styled.div`
  font-size: 12px;
  padding: 1px;
  margin-top: 5px;
  // border-radius: 15px;
`;

// This file takes the list of product and ensures the functionality to edit them in view

export default function UpdateProduct (props) {
  const [product, setProduct] = useState([]);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  
  useEffect(() => {
    retrieveProduct();
  }, [name]);

  function editProduct(id, newProductName) {
    setName(newProductName)

    const editedProductList = product.map(item => {
    // if this product has the same ID as the curent edited product
      if (id === product.productid) {
        return {...item, product: newProductName}
      }
      return item;
    });
    setProduct(editedProductList);

    let data = {
      product: newProductName
    };

    Services.updateProduct(id, data)
      .then((res) => {
        console.log("product updated")
        setSaved(true)
      })
      .catch(() => {
        console.log("an error occured")
      })
  }


  const retrieveProduct = () => {
    Services.getProduct()
    .then((response) => {
        setProduct(response.data.product);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const productList = product
  .map(item => (
    <Product 
      id={item.productid}
      product={item.product}
      key={item.productid}
      editProduct={editProduct}
    />
  ));

  return (
    <>
      <ListWrapper>
        <Row className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
          <p style={{fontSize: "13px"}}><b>Update Product</b></p>

          <ListGroup variant="flush" >
            {productList}
          </ListGroup>

        </Row>
    </ListWrapper>
    </>
  )
}