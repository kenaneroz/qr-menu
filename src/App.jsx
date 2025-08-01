import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Product from './components/Product.jsx'
import { FaChevronLeft } from "react-icons/fa6"
import Details from './components/Details.jsx'
import Basket from './components/Basket.jsx'
import BasketProduct from './components/BasketProduct.jsx'

function App() {
  const data = [
    {
      imgUrl: '',
      translations: {
        "English": {
          title: 'Drinks',
          sub: [
            {
              imgUrl: '',
              title: 'Cold Drinks',
              sub: [
                {
                  imgUrl: '',
                  title: 'Iced Filter Coffee',
                  description: 'Description'
                }
              ]
            },
            {
              imgUrl: '',
              title: 'Hot Drinks',
              sub: [
                {
                  imgUrl: '',
                  title: 'Americano',
                  description: 'Description'
                },
                {
                  imgUrl: '',
                  title: 'Hot Chocolate',
                  description: 'Description'
                }
              ]
            }
          ]
        },
        "Turkish": {
          title: "İçecekler",
          description: '',
          sub: [
            {
              imgUrl: '',
              title: 'Soğuk İçecekler',
              sub: [
                {
                  imgUrl: '',
                  title: 'Soğuk Filtre Kahve',
                  description: 'Açıklama'
                }
              ]
            },
            {
              imgUrl: '',
              title: 'Sıcak İçecekler',
              sub: [
                {
                  imgUrl: '',
                  title: 'Americano',
                  description: 'Açıklama'
                },
                {
                  imgUrl: '',
                  title: 'Sıcak Çikolata',
                  description: 'Açıklama'
                }
              ]
            }
          ]
        }
      }
    }
  ]

  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const [productStack, setProductStack] = useState([data.map(item => item.translations[selectedLanguage])])

  useEffect(() => {
    setProductStack([data.map(item => item.translations[selectedLanguage])])
  }, [selectedLanguage])

  function showSubProducts(product) {
    if(product.sub) {
      setProductStack(prev => [...prev, product.sub])
    }
  }
  
  function handleBack() {
    setProductStack(prev => prev.slice(0, -1))
  }

  const [detailsActive, setDetailsActive] = useState(false)

  const [currentProduct, setCurrentProduct] = useState(null)

  function showDetails(product) {
    if(!product.sub) {
      setDetailsActive(true)
      setBasketActive(false)
      setCurrentProduct(product)
    }
  }

  const [basketActive, setBasketActive] = useState(false)
  const [basket, setBasket] = useState([])
 
  function addToBasket() {
    setBasket(prev =>  [...prev, {...currentProduct, count: 1}])
  }

  function increaseCount(selectedProduct) {
    setBasket(prev => prev.map(product => product.title == selectedProduct.title ? {...product, count: product.count + 1} : product))
  }
  function decreaseCount(selectedProduct) {
    setBasket(prev => prev.map(product =>(product.title == selectedProduct.title && product.count > 0) ? {...product, count: product.count - 1} : product))
    setBasket(prev => prev.filter(product => product.count != 0))
  }


  function showBasket() {
    setBasketActive(true)
    setDetailsActive(false)
  }
  function hideBasket() {
    setBasketActive(false)
  }


  const productsShown = productStack[productStack.length - 1].map((product, index) => {
    return <Product 
      key={index}
      imgUrl={product.imgUrl} 
      title={product.title}
      onClick={() => {
        showDetails(product)
        showSubProducts(product)
      }}
    />
  })



  return (
    <div className='px-[25px]'>
      <Header 
        setSelectedLanguage={setSelectedLanguage} 
        showBasket={showBasket}  
      />

      <div className='pt-[50px]'>
        {
          productStack.length > 1 
          && 
          <FaChevronLeft
            className='mb-[15px] cursor-pointer'
            onClick={handleBack}
          />
        }
        <div className="grid grid-cols-2 gap-[5px]">{productsShown}</div>
      </div>

      <Details 
        detailsActive={detailsActive}
        currentProduct={currentProduct}
        setDetailsActive={setDetailsActive}
        basket={basket}
        addToBasket={addToBasket}
        increaseCount={() => increaseCount(currentProduct)}
        decreaseCount={() => decreaseCount(currentProduct)}
      />

      <Basket
        basketActive={basketActive}
        hideBasket={hideBasket}
        basket={basket}
        setBasket={setBasket}
        increaseCount={increaseCount}
        decreaseCount={decreaseCount}
        setCurrentProduct={setCurrentProduct}
      />
    </div>
  )
}

export default App