import { useEffect, useState } from "react";
import { Alert, Col, Image, Row } from "react-bootstrap";
import userService from "../backend/userService";
import useAuth from "../hooks/useAuth";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState({ error: false, msg: "" });
  const { user } = useAuth();

  useEffect(() => {
    const displayItems = async () => {
      try {
        if (!user) {
          setError({ error: true, msg: "You must login or signup first" });
        } else if (user) {
          await userService
            .displayCart(`users/cart/${user.uid}`)
            .then((data) => {
              setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
        }
      } catch (error) {
        setError({ error: true, msg: error.code });
      }
    };
    displayItems();
  }, [user, items]);

  const RemoveItem = async (id) => {
    try {
      await userService
        .removeFromCart(`users/cart/${user.uid}`, id)
        .then(() => setError({ error: false, msg: "Item removed" }));
    } catch (error) {
      setError({ error: true, msg: error.code });
    }
  };

  return (
    <>
      <div className="container py-3">
        {error?.msg && (
          <Alert variant={error?.error ? "danger" : "success"}>
            {error?.msg}
          </Alert>
        )}
        <Row>
          {items.map((item) => (
            <Col key={item.id} xs="12" sm="12" md="4" lg="3">
              <div
                className="card rounded-4 my-3 shadow-sm"
                style={{ height: "450px" }}
              >
                <div className="card-body">
                  <Image
                    src={item.img}
                    alt="thumbnail"
                    width={280}
                    className="d-block m-auto"
                  />
                  <div className="card-title">{item.title.slice(0, 45)}...</div>
                  <div className="card-text mb-3 text-danger">
                    &#8377; {item.price}
                  </div>
                  <div className="btn-group">
                    <button
                      onClick={() => RemoveItem(item.id)}
                      className="btn btn-danger text-white"
                    >
                      Remove
                    </button>
                    <button className="btn btn-primary">Buy</button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
export default Cart;
