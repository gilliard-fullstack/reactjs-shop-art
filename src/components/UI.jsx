import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QTDE, DELETE } from '../redux/slice';
import { totalPrice } from '../redux/slice';

export const UI = (props) => {
  // REDUX - Retorno do state
  const cartState = useSelector(state => state.cart);
  // Objeto de Visibility
  let visibility = [];
  // REDUX - Função de dispara a ACTION
  const dispatch = useDispatch();
  // Altera a visibilidade do botão DECREMENTO, se for menor que 2
  const visibilidadeBotao = (KEY) => {
    let  btnDecremento = document.querySelector(`#id_btn_${Number(KEY)}`);
    let visStatus = visibility.filter((item) => Number(item.key) === Number(KEY));
    
    if(Boolean(visStatus) === Boolean(true))
    { 
      // Verifica se é menor que 2
      if(Boolean(visStatus) === Boolean(true) && cartState[KEY].qtde < 2)
      {
        console.log(KEY, ' MENOR : hidden')
        console.log('Elemento - TRUE: ', btnDecremento)
        //##############################################
        //##############################################
        // esta exibindo o erro, de objeto nulo
        //##############################################
        //##############################################
        btnDecremento !== null ? btnDecremento.style.visibility = 'hidden' : console.log('NULL');
      }
      // Verifica se é maior que 1
      else
      {
        console.log(KEY, ' MAIOR : Visible')
        console.log('Elemento - FALSE: ', btnDecremento)
        //##############################################
        //##############################################
        // esta exibindo o erro, de objeto nulo
        //##############################################
        //##############################################
        btnDecremento.style.visibility = 'visible';
      }
    }
    else
    {
      // Se FALSE ( Não existe o item ), então faz o PUSH
      visibility.push({'key' : Number(KEY), 'visibility' : 'hidden'})
    }
    
  }
  // Altera a quantidade, individualmente dos itens, presentes no carrinho
  const alterarQuantidadeDoItem = ( KEY, options, ID ) => {
    // Adiciona o item ao Objeto de visibilidade, do botão DECREMENTO
    // 1. Pega o valor do campo de quantidade de cada produto
    let  qtdeInput = document.querySelector(`#id_${KEY}`);
    // 2. Soma ou subtrai a quantidade de produtos no carrinho
    options === 'incremento' ?  qtdeInput.value = Number( qtdeInput.value ) + 1 : qtdeInput.value = Number( qtdeInput.value ) - 1;
    // 4. REDUX - Disparo a ACTION [ QTDE ]
    dispatch(QTDE({id: ID, option: options, qtde: qtdeInput.value}));
    visibilidadeBotao(Number(KEY))
    
  }
  // Deleta o item do carrinho
  const delItem = (KEY, ID) => {
    // 1. REDUX - Disparo a ACTION [ DELETE ]
    dispatch(DELETE({key: KEY, id: ID}));
  }

    return (
      <>
        
        {
          // Lista os produtos que estão no carrinho
          Object.keys(props.shopList).map(key => (
            <div className="item" key={ props.shopList[key].id }>
              <div className="name">{ props.shopList[key].name }</div>
              <div className="price">{ props.shopList[key].price }</div>
              <div className="qtde_container">
                <div className="qtde_mais" onClick={() => alterarQuantidadeDoItem(key, 'incremento', props.shopList[key].id)}>+</div>
                <input id={`id_${key}`} type="text" className="qtde" value={ props.shopList[key].qtde } onChange={() => alterarQuantidadeDoItem(key)} />
                <div id={`id_btn_${key}`} className="qtde_menos" onClick={() => alterarQuantidadeDoItem(key, 'decremento', props.shopList[key].id)}>-</div>
              </div>
              <div className="delete" onClick={() => delItem( key,  props.shopList[key].id )}>X</div>
              <div className="item-total" >{ props.shopList[key].total }</div>
              {visibilidadeBotao(Number(key))}
            </div>
          ))
        }
      </>
    )
}

export { totalPrice }