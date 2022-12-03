   import { createSlice } from '@reduxjs/toolkit';

    let totalPrice = 0;

    const sumPrice = (id, price) => {
        // Soma o valor total das compras
        totalPrice = totalPrice + price;
    }

    export const slice = createSlice({
        name: 'initial',
        
        initialState : [],
        
        reducers: {
            // Adiciona itens ao carrinho
            ADDS: (state, actions) => {
                // Se o item recebido pelo [ actions.payload ] for encontrado no [ state ]
                let findItem = state.find((item) => Number(item.id) === Number(actions.payload.id));
                // Caso FALSE adiciona o item ao [ state ] ou exibe a mensagem no [ console.log ]
                !findItem ? state.push({...actions.payload}) : console.log('Este produto já existe em seu carrinho', Boolean(findItem));
                // Soma o valor TOTAL de cada ITEM
                state.map(cart => Number(cart.id) === Number(actions.payload.id) ?
                    // Altera a propriedade TOTAL no Objeto, filtrando pelo ID
                    cart.total = Number(cart.qtde) * Number(cart.price)
                :            
                    console.log('')
                )
                // Soma o valor TOTAL de TODAS as COMPRAS
                sumPrice(Number(actions.payload.id), Number(actions.payload.price))
            },
            
            // Altera no STATE a quantidade de itens desejado, filtrado pelo ID
            QTDE: (state, actions) => {
                totalPrice = 0;
                // Se o item recebido pelo [ actions.payload ] for identico ao item existente no [ state ]
                state.map(item =>
                    {
                        if(item.id === actions.payload.id)
                        {
                            // Recebido INCREMENTO ?
                            if(actions.payload.option === 'incremento')
                            {
                                // A quantidade ICREMENTADA é alterado no carrinho
                                item.qtde = actions.payload.qtde;
                                // Soma o valor do item individualmente
                                item.total = Number(actions.payload.qtde * item.price);
                            }
                            else
                            {
                                //Deleta o item do carrinho
                                item.qtde = actions.payload.qtde;
                                // Recalcula os valores dos itens individualmente
                                item.total = Number(actions.payload.qtde * item.price);
                                // Exibe a mensagem no console
                                console.log('decremento');

                            }
                        }
                        else
                        {
                            // Exibe mensagem no console
                            console.log('O ID do produto, não corresponde ao ID recebido');
                        }
                        //##################################################
                        // Soma os valores de todos os produtos comprados //
                        //##################################################
                        totalPrice = totalPrice + ( Number(item.qtde * Number(item.price)) );
                    }
                )
            },

            // Deleta do STATE, o item filtrado pelo ID
            DELETE: (state, actions) => {
                // Somar o valor dos itens no CARRINHO
                state.map(product => {
                    // Verificar se o ID do item é igual ao ID recebido
                    if(Number(product.id) === Number(actions.payload.id))
                    {
                        // Subtrai o valor dos itens excluidos do valor total do carrinho
                        totalPrice = totalPrice - (Number(product.qtde) * Number(product.price));
                        // Zera a quantidade para default
                        product.qtde = 1;
                        // Zera o valor TOTAL do item para default
                        product.total = 0;
                        // Deleta o item pela KEY
                        state.splice(actions.payload.key, 1)
                        // Exibe a mensagem no console
                        console.log('Deletado: ', actions.payload.key)
                    }
                })
            }
            
        }
    });

    export const { ADDS, TOTAL, QTDE, DELETE } = slice.actions;

    export default slice.reducer;

    export { totalPrice };