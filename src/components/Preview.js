import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Carousel,
  Col,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { auth } from "../backend/firebase.config";
import productServices from "../backend/productServices";
import userService from "../backend/userService";
import useAuth from "../hooks/useAuth";

const Preview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState([]);
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState({ error: false, msg: "" });
  const { user } = useAuth();

  useEffect(() => {
    const previewProduct = async () => {
      try {
        await productServices.previewProduct("products", id).then((data) => {
          if (data.exists()) {
            setProduct(data.data());
          }
        });
      } catch (error) {
        console.log(error.code);
      }
    };
    previewProduct();
  }, [id]);

  useEffect(() => {
    const previewThumbnail = async () => {
      try {
        await productServices.previewProduct("products", id).then((data) => {
          if (data.exists()) {
            setThumbnail(data.data().thumbnail);
          }
        });
      } catch (error) {
        console.log(error.code);
      }
    };
    previewThumbnail();
  }, [id]);

  useEffect(() => {
    const previewFeatures = async () => {
      try {
        await productServices.previewProduct("products", id).then((data) => {
          if (data.exists()) {
            setFeatures(data.data().features);
          }
        });
      } catch (error) {
        console.log(error.code);
      }
    };
    previewFeatures();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (user) {
        await userService
          .addToCart(`users/cart/${auth.currentUser.uid}`, product)
          .then(() => {
            setError({ error: false, msg: "Item is added into cart" });
          });
      } else if (!user) {
        return setError({ error: true, msg: "You must login or signup first" });
      }
    } catch (error) {
      setError({ error: true, msg: error.code });
    }
  };

  return (
    <>
      <div className="container-fluid py-3">
        <Row>
          <Col className="h-100" xs="12" sm="12" md="6" lg="6">
            <Carousel slide className="position-sticky top-0">
              {thumbnail.map((photo, idx) => (
                <Carousel.Item key={idx}>
                  <Image src={photo} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6" style={{}}>
            <p className="fs-3 fw-semibold">{product && product.title}</p>
            <p className="fs-3 fw-semibold text-danger">
              &#8377; {product && product.price}
            </p>
            <p className="fw-semibold">About this item</p>
            <ul>
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Stack direction="horizontal" gap={3}>
              <Button
                className="btn-secondary text-white w-25"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button className="btn-primary text-white w-25">Buy</Button>
            </Stack>
            {error?.msg && (
              <Alert
                className="mt-3"
                variant={error?.error ? "danger" : "success"}
              >
                {error?.msg}
              </Alert>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Preview;
