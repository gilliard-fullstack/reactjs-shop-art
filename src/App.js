import React from "react";
import './App.css';

// API - Lista de Produtos da Loja
import { products } from './commons/API/product';

// COMPONENT - Cart
import { UI } from './components/UI';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { ADDS } from './redux/slice';
import { totalPrice } from './components/UI';

function App() {

  // Redux
  const dispatch = useDispatch();

  const cartState = useSelector(state => state.cart);

  // Add Product
  const ADD = ( products ) => {
    // Dispara o Dispatch do Redux, enviando o objeto do produto recebido por esta função
    dispatch(ADDS(products));
  }
  
  // Return da aplicação
  return (
    <div className="container">  
    
      {/* Cabeçalho da aplicação */}
      <h1 className="title">Shop Something</h1>

      {/* Catalogo de produtos */}
      <div className="catalog">
        {/* List of Products */}
        {
          products.map(product => (
            <div className="product" key={ product.id } onClick={() => ADD(product)}>
              <img className="img" src={require(`${product.image}`)} alt='' />
              <span>{ product.name }</span>
              <span className="subtitle">{ product.subtitle }</span>
              <span><b>R$ { product.price }</b></span>
            </div>
          ))
        }
      </div>
      
      {/* Title */}
      <h1 className="title">This is your cart: Quantity: <span className="detail"> { cartState.length }</span> | Total: <span className="detail"> R$ { totalPrice }</span></h1>

      {/* Meu carrinho de compras */}
      <div className="cart">
        <UI shopList={cartState} />
      </div>
      
      {/* Rodapé da aplicação */}
      <span className="footer">Desenvolvido por Gilliard Santos</span>

    </div>
  );
}

export default App;
