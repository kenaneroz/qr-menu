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
      translations: {
        "English": {
          imgUrl: '/drinks.jpg',
          title: 'Drinks',
          sub: [
            {
              imgUrl: '/drinks.jpg',
              title: 'Cold Drinks',
              sub: [
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Iced Filter Coffee',
                  description: 'Description'
                }
              ]
            },
            {
              imgUrl: '/drinks.jpg',
              title: 'Hot Drinks',
              sub: [
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Americano',
                  description: 'Description'
                },
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Hot Chocolate',
                  description: 'Description'
                }
              ]
            }
          ]
        },
        "Turkish": {
          imgUrl: '/drinks.jpg',
          title: "İçecekler",
          description: '',
          sub: [
            {
              imgUrl: '/drinks.jpg',
              title: 'Soğuk İçecekler',
              sub: [
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Soğuk Filtre Kahve',
                  description: 'Açıklama'
                }
              ]
            },
            {
              imgUrl: '/drinks.jpg',
              title: 'Sıcak İçecekler',
              sub: [
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Americano',
                  description: 'Açıklama'
                },
                {
                  imgUrl: '/drinks.jpg',
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
    document.body.style.overflow = 'hidden'
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
    document.body.style.overflow = 'hidden'
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
    <div>
      <Header 
        setSelectedLanguage={setSelectedLanguage} 
        showBasket={showBasket}  
      />

      <div className='bg-white translate-y-[-100px] mx-[25px] p-[25px]'>
        {
          productStack.length > 1 
          && 
          <div className='cursor-pointer flex items-center gap-[5px] mb-[10px]' onClick={handleBack}>
            <FaChevronLeft />
            <p>Back</p>
          </div>
    
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