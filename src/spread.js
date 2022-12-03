    import React, { useState } from 'react';

    const products = [
        {
            emoji: '🍦',
            name: 'ice cream',
            price: 5,
        },
        {
            emoji: '🍩',
            name: 'donuts',
            price: 2.5,
        },
        {
            emoji: '🍉',
            name: 'watermelon',
            price: 4,
        }
    ];

    const Spread = () => {

        const[cart, setCart] = useState([]);

        const ADD = ( product ) => {
            setCart( current => [...current, product.name] );
            console.log(`Content: `, cart);
        }

        const REMOVE = ( product ) => {
            setCart([]);
            console.log(`Current: `, cart);
        }

        return (
            <>
                <h1>{ cart.length }</h1>
                <div>
                    {
                        products.map(product => (
                            <div key={product.name}>
                                <div className="product">
                                    <span role="img" aria-label= {product.name}>{product.emoji} </span>
                                </div>
                                <button onClick={() => ADD(product)}>Add</button>
                                <button onClick={() => REMOVE(product)}>Remove</button>
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    export default Spread;