import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../utils/Nav";
import Footer from "../utils/Footer";
import productsData from "../data/productdetail.json";
import "../css/styles3.css";

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [newReview, setNewReview] = useState({
    user: "",
    title: "",
    comment: "",
    // rating: 0,
  });
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cartData.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      cartData[existingProductIndex].quantity += quantity;
    } else {
      cartData.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        description: product.description,
        imagePath: product.imagePath,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cartData));

    alert("Product added to cart!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const updatedProductDetails = [...productsData];
    const productIndex = updatedProductDetails.findIndex(
      (p) => String(p.id) === productId
    );

    if (productIndex !== -1) {
      updatedProductDetails[productIndex].reviews.push({
        id: new Date().getTime(),
        ...newReview,
      });

      setProduct(updatedProductDetails[productIndex]);
      setNewReview({
        user: "",
        title: "",
        comment: "",
        // rating: 0,
      });
    }
  };

  useEffect(() => {
    const selectedProduct = productsData.find(
      (p) => String(p.id) === productId
    );
    setProduct(selectedProduct);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container my-5 p-5">
        <div className="row">
          <div className="col-md-5">
            <div className="main-img">
              <img
                className="img-fluid"
                src={product.imagePath}
                alt="ProductS"
              />
              <div className="row my-3 previews">
                <div className="col-md-3">
                  <img className="w-100" src={product.imagePath} alt="Sale" />
                </div>
                <div className="col-md-3">
                  <img className="w-100" src={product.imagePath} alt="Sale" />
                </div>
                <div className="col-md-3">
                  <img className="w-100" src={product.imagePath} alt="Sale" />
                </div>
                <div className="col-md-3">
                  <img className="w-100" src={product.imagePath} alt="Sale" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="main-description px-2">
              <div className="product-title text-bold my-3">{product.name}</div>

              <div className="price-area my-4">
                <p className="new-price text-bold mb-1">₹ {product.price}/- </p>
              </div>

              <div className="row">
                <div className="buttons d-flex my-5">
                  <div className="block">
                    <button
                      className="shadow btn custom-btn"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>
                  </div>

                  <div className="block quantity">
                    <input
                      type="number"
                      className="form-control"
                      id="cart_quantity"
                      value={quantity}
                      min="1"
                      max="5"
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value, 10))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="product-details my-4">
              <p className="details-title text-color mb-1">Details</p>
              <p className="description">{product.description}</p>
            </div>
          </div>
        </div>

        <div className="container similar-products my-4">
          <p className="display-5 text-center" style={{ color: "#34495E " }}>
            Product Reviews
          </p>

          <div className="row">
            {product.reviews.map((review) => (
              <div className="col-md-3">
                <div className="similar-product text-center">
                  <div class="card" style={{ width: "18rem;" }}>
                    <div class="card-body">
                      <h5
                        class="card-title"
                        style={{ fontFamily: "cursive", color: "#1F618D " }}
                      >
                        {review.user}
                      </h5>
                      <div className="row">
                        <div className="col">
                          <h6 class="card-subtitle p-2 text-muted">
                            {review.title}{" "}
                          </h6>
                        </div>
                      </div>

                      <hr />
                      <p class="card-text">{review.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="container similar-products my-4">
            <p className="display-5 text-center" style={{ color: "#34495E " }}>
              Add Review
            </p>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleReviewSubmit} className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="user" className="form-label">
                      User:
                    </label>
                    <input
                      type="text"
                      name="user"
                      value={newReview.user}
                      onChange={handleInputChange}
                      className="form-control"
                      id="user"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newReview.title}
                      onChange={handleInputChange}
                      className="form-control"
                      id="title"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="comment" className="form-label">
                      Comment:
                    </label>
                    <textarea
                      name="comment"
                      value={newReview.comment}
                      onChange={handleInputChange}
                      className="form-control"
                      id="comment"
                      required
                    />
                  </div>

                  <div className="col-md-6 d-flex align-items-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ color: "#34495E  " }}
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
