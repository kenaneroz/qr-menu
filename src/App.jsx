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

  const [productToShowDetails, setProductToShowDetails] = useState(null)

  function showDetails(product) {
    if(!product.sub) {
      setDetailsActive(true)
      setBasketActive(false)
      setProductToShowDetails(product)
    }
  }

  const [basketActive, setBasketActive] = useState(false)
  const [basket, setBasket] = useState([])
 
  function addToBasket() {
    setBasket(prev => {
      const existingProduct = prev.find(product => product.title === productToShowDetails.title)

      if(existingProduct) {
        return (
          prev.map(product => product.title === productToShowDetails.title ? {...product, count: (product.count || 1) + 1} : product)
        )
      } else {
        return [...prev, {...productToShowDetails, count: 1}];
      }
    })
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
      {
        detailsActive 
        &&
        <Details 
          productToShowDetails={productToShowDetails}
          setDetailsActive={setDetailsActive}
          addToBasket={addToBasket}
        />
      }
      {
        basketActive
        &&
        <Basket
          hideBasket={hideBasket}
          basket={basket}
          setBasket={setBasket}
        />
      }
    </div>
  )
}

export default App