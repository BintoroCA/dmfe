import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import { Container, Row, Col } from "react-bootstrap";
// import { UserContext } from "../context/userContext";
import Navbar from "../components/Navbar";
import ProductCard from "../components/card/ProductCard";
import imgEmpty from "../assets/empty.svg";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Product() {

  const title = "Shop";
  document.title = "DumbMerch | " + title;

  // Fetching product data from database
  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });
  // let { data: productsdesc } = useQuery('productsdescCache', async () => {
  //   const response = await API.get('/productsdesc');
  //   return response.data.data;
  // });
  // let { data: productspriceasc } = useQuery('productspriceascCache', async () => {
  //   const response = await API.get('/productspriceasc');
  //   return response.data.data;
  // });
  // let { data: productspricedesc } = useQuery('productspricedescCache', async () => {
  //   const response = await API.get('/productspricedesc');
  //   return response.data.data;
  // });

  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
  };

  return (
    <div>
      <Navbar title={title} />
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="text-header-product">Product</div>
          </Col>
        </Row>
        <Row className="my-4">
          {products?.length != 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {products?.map((item, index) => (
                <ProductCard item={item} index={index} />
              ))}
            </Masonry>
          ) : (
            <Col>
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: "40%" }}
                />
                <div className="mt-3">No data product</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
