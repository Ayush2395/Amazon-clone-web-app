import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import productServices from "../backend/productServices";
import ProductCards from "../components/ProductCards";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fecthData = async () => {
    try {
      await productServices.getProducts("products").then((data) => {
        if (data.empty) {
          console.log("No product found");
        } else
          setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.table(error.message);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div className="container py-5">
      <Row>
        {products.map((product) => (
          <Col xs="12" sm="12" md="4" lg="4" key={product.id}>
            <ProductCards details={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
