import { Link } from "react-router-dom";

const ProductCards = ({ details }) => {
  return (
    <>
      <div className="card rounded-0 mb-3 py-2 h-100">
        <div className="card-body">
          <img src={details.img} alt="product" className="card-img" />
          <Link to={`/preview/${details.id}`} className="card-title">
            {details.title.slice(0, 40)}...
          </Link>
          <div className="card-text">
            Price : <span className="text-red">{details.price} </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCards;
