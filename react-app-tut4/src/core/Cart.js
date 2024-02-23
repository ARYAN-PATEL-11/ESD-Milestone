import React, { useState, useEffect } from 'react';
import Nav from '../utils/Nav';
// import Footer from '../utils/Footer';
import '../css/cart.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [userQuantities, setUserQuantities] = useState({});

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    
    setProducts(cartData);

    const defaultQuantities = {};
    cartData.forEach(product => {
      defaultQuantities[product.id] = product.quantity || 1;
    });
    setUserQuantities(defaultQuantities);
  }, []);

  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  };

  const handleRemoveItem = (id) => {
    const updatedProducts = products.filter(item => item.id !== id);
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const handleQuantityChange = (productId, quantity) => {
    setUserQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));

    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, quantity };
      }
      return product;
    });

    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const calculateSubtotal = (product) => {
    const quantity = userQuantities[product.id] || 0;
    return (product.price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = userQuantities[product.id] || 0;
      return total + (product.price * quantity);
    }, 0).toFixed(2);
  };

  return (
    <div className="row">
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: '50%', color: '#DA70D6' }}>Product</th>
              <th style={{ width: '10%', color: '#DA70D6' }}>Price</th>
              <th style={{ width: '10%', color: '#DA70D6' }}>Quantity</th>
              <th style={{ width: '10%', color: '#DA70D6' }} className="text-center">Subtotal</th>
              <th style={{ width: '10%', color: '#DA70D6' }}></th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={item.id}>
                <td data-th="Product">
                  <div className="row">
                    <div className="col-sm-2 col-4 hidden-xs">
                      <img src={item.imagePath} alt={item.name} className="img-fluid" />
                    </div>
                    <div className="col-sm-10 col-8">
                      <h4 className="nomargin" style={{ color: 'black' }}>{item.name}</h4>
                      <p style={{ fontFamily: 'cursive' }}>{item.description}</p>
                    </div>
                  </div>
                </td>
                <td data-th="Price">
                  {item.price !== undefined ? `₹ ${item.price.toFixed(2)}` : 'Price not available'}
                </td>
                <td data-th="Quantity">
                  <input
                    type="number"
                    className="form-control text-center"
                    value={userQuantities[item.id] || 0}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />
                </td>
                <td data-th="Subtotal" className="text-center">
                  {item.price !== undefined ? `₹ ${calculateSubtotal(item)}` : 'Subtotal not available'}
                </td>
                <td className="actions" data-th="">
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.id)}><i className="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="visible-xs">
              <td className="text-center"><strong>Total Payable Amount</strong></td>
              <td className="text-center"><strong></strong></td>
              <td className="text-center"><strong></strong></td>
              <td className="text-center">
                <strong>
                  ₹ {calculateTotal()}
                </strong>
              </td>
              <td className="text-center"><strong></strong></td>
            </tr>
            <tr>
              <td><a href="/" className="btn btn-warning"><i className="fas fa-angle-left"></i> Continue Shopping</a></td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs"></td>
              <td><a href="/" className="btn btn-success btn-block">Checkout <i className="fas fa-angle-right"></i></a></td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
