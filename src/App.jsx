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
          price: 'none',
          sub: [
            {
              imgUrl: '/drinks.jpg',
              title: 'Cold Drinks',
              price: 'none',
              sub: [
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Iced Filter Coffee',
                  description: 'Description',
                  price: 3 
                }
              ]
            },
            {
              imgUrl: '/drinks.jpg',
              title: 'Hot Drinks',
              price: 'none',
              sub: [
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Americano',
                  description: 'Description',
                  price: 3
                },
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Hot Chocolate',
                  description: 'Description',
                  price: 3
                }
              ]
            }
          ]
        },
        "Turkish": {
          imgUrl: '/drinks.jpg',
          title: "İçecekler",
          description: '',
          price: 'none',
          sub: [
            {
              imgUrl: '/drinks.jpg',
              title: 'Soğuk İçecekler',
              price: 'none',
              sub: [
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Soğuk Filtre Kahve',
                  description: 'Açıklama',
                  price: 3
                }
              ]
            },
            {
              imgUrl: '/drinks.jpg',
              title: 'Sıcak İçecekler',
              price: 'none',
              sub: [
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Americano',
                  description: 'Açıklama',
                  price: 3
                },
                {
                  imgUrl: '/drinks.jpg',
                  title: 'Sıcak Çikolata',
                  description: 'Açıklama',
                  price: 3
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
      setSidebar(false)
    }
  }

  const [basketActive, setBasketActive] = useState(false)
  const [basket, setBasket] = useState([])

  const [total, setTotal] = useState(0)

  const [basketItemsCount, setBasketItemsCount] = useState(0)
  useEffect(() => {
    let count = 0
    let total = 0
    basket.map(product => {
      count += product.count
      if(product.price != 'none') total += product.count * product.price
    })
    setBasketItemsCount(() => count ? count : 0)
    setTotal(total)
  }, [basket])
 
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
    setSidebar(false)
  }
  function hideBasket() {
    setBasketActive(false)
  }

  const productsShown = productStack[productStack.length - 1].map((product, index) => {
    return <Product 
      key={index}
      imgUrl={product.imgUrl} 
      title={product.title}
      price={product.price}
      onClick={() => {
        showDetails(product)
        showSubProducts(product)
      }}
    />
  })

  function setCount(p, c) {
    setBasket(prev => prev.map(product => product.title == p.title ? {...product, count: c} : product))
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [searchItems, setSearchItems] = useState([])
  useEffect(() => {
    if(searchTerm === '') {
      setSearchItems([])
    }
    searchMenu(data, selectedLanguage, searchTerm)
  }, [searchTerm])
  function searchMenu(data, selectedLanguage, searchTerm) {
    const results = []

    function traverse(items) {
      for (const item of items) {

        if(item.title.toLowerCase().includes(searchTerm.toLowerCase()) && !item.sub) {
          results.push(item)
        }

        if(item.sub && Array.isArray(item.sub)) {
          traverse(item.sub)
        }
      }
    }

    for(const category of data) {
      const langData = category.translations[selectedLanguage]
      if(langData) {
        traverse([langData])
      }
    }

    setSearchItems(results)
  }

  const [searchBar, setSearchBar] = useState(false)
  function showHideSearchBar() {
    setSearchBar(prev => !prev)
  }

  const [sidebar, setSidebar] = useState(false)
  function showSidebar() {
    setSidebar(true)
    setBasketActive(false)
    setDetailsActive(false)
    if(sidebar) document.body.style.overflow = 'hidden'
  }
  function hideSidebar() {
    setSidebar(false)
  }

  return (
    <div>
      <Header 
        setSelectedLanguage={setSelectedLanguage} 
        showBasket={showBasket}  
        basketItemsCount={basketItemsCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBar={searchBar}
        showHideSearchBar={showHideSearchBar}
        sidebar={sidebar}
        showSidebar={showSidebar}
        hideSidebar={hideSidebar}
      />

      <div className='bg-white translate-y-[-90px] z-40 mx-[25px] p-[25px]'>
        {
          productStack.length > 1 && searchTerm === ''
          && 
          <div className='cursor-pointer flex items-center gap-[5px] mb-[10px]' onClick={handleBack}>
            <FaChevronLeft />
            <p>Back</p>
          </div>
    
        }
        <div className="w-full max-w-full min-h-screen grid grid-cols-2 gap-[5px]">
          {
            searchTerm === ''
            ?
            productsShown
            :
            searchItems.map((product, index) => {
              return <Product 
                key={index}
                imgUrl={product.imgUrl} 
                title={product.title}
                price={product.price}
                onClick={() => {
                  showDetails(product)
                  showSubProducts(product)
                }}
              />
            })
          }
        </div>
      </div>
      
      {
        detailsActive &&
        <Details 
          detailsActive={detailsActive}
          currentProduct={currentProduct}
          setDetailsActive={setDetailsActive}
          basket={basket}
          addToBasket={addToBasket}
          increaseCount={() => increaseCount(currentProduct)}
          decreaseCount={() => decreaseCount(currentProduct)}
          setCount={(e) => setCount(currentProduct, JSON.parse(e.target.value))}
        />
      }

      {
        basketActive &&
        <Basket
          basketActive={basketActive}
          hideBasket={hideBasket}
          basket={basket}
          setBasket={setBasket}
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
          setCurrentProduct={setCurrentProduct}
          setCount={setCount}
          total={total}
        />
      }


    </div>
  )
}

export default App