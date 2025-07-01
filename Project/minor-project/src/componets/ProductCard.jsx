import React from 'react';
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      name: product.name,
      price: product.price,
      date: new Date().toLocaleDateString(),
      status: 'In Transit',
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>{product.price}</strong></p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;



// import React from 'react';
// import './ProductCard.css';

// const ProductCard = ({ product }) => {
//   return (
//     <div className="product-card">
//       <img src={product.imageUrl} alt={product.name} />
//       <div className="product-info">
//         <h4>{product.name}</h4>
//         <p className="location">Category: {product.category}</p>
//         <p className="description">{product.description}</p>
//         <p className="review">“{product.review}”</p>
//         <div className="price-review">
//           <span className="price">₹{product.price}</span>
//           <button className="view-btn">Add to Card</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



