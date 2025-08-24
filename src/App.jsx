import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Product from './components/Product.jsx'
import { FaChevronLeft } from "react-icons/fa6"
import Details from './components/Details.jsx'
import Category from './components/Category.jsx'
import BasketProduct from './components/BasketProduct.jsx'
import { IoMdClose } from "react-icons/io"

function App() {
  const data = [
    {
      id: '0',
      bgUrl: 'drinks.jpg',
      translations: {
        "English": {
          title: 'Cold Drinks',
          content: [
            {
              id: '00',
              bgUrl: 'drinks.jpg',
              title: 'Iced Filter Coffee',
              description: 'Description',
              price: 3
            }
          ]
        },
        "Turkish": {
          title: 'Soğuk İçecekler',
          content: [
            {
              id: '00',
              bgUrl: 'drinks.jpg',
              title: 'Soğuk Filtre Kahve',
              description: 'Açıklama',
              price: 110
            }
          ]
        } 
      }
    }
  ]

  const langs = {
    translations: {
      "English": {
        searchBoxPlaceholder: 'Search',
        backButton: 'Back',
        detailsAddButton: 'Add to Card',
        clearBasketButton: 'Clear Basket',
        basketEmpty: 'Your basket is empty!',
        addSomethingButton: 'Add Something',
        detailsProductRemoveButton: 'Delete',
        checkout: 'Checkout',
        sidebarContactTitle: 'Contact Us',
        currency: '$',
      },
      "Turkish": {
        searchBoxPlaceholder: 'Ara',
        backButton: 'Geri',
        detailsAddButton: 'Sepete Ekle',
        clearBasketButton: 'Sepeti Boşalt',
        basketEmpty: 'Sepetiniz boş!',
        addSomethingButton: 'Bir şeyler Ekle',
        detailsProductRemoveButton: 'Kaldır',
        checkout: 'Toplam Tutar',
        sidebarContactTitle: 'Bize Ulaşın',
        currency: '₺',
      }
    }
  }

  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = data.map(category => {
    return (
      <Category
        id={category.id}
        bgUrl={category.bgUrl}
        title={category.translations[selectedLanguage].title}
        setSelectedCategory={() => setSelectedCategory(data.find(cat => cat.id == category.id))}
      />
    )
  })

  const [selectedProduct, setSelectedProduct] = useState(null)

  const categoryProducts = selectedCategory?.translations[selectedLanguage].content.map(product => {
    return (
      <Product
        id={product.id}
        bgUrl={product.bgUrl}
        title={product.title}
        description={product.description}
        price={product.price}
        selectedLanguage={selectedLanguage}
        langs={langs}
        setSelectedProduct={() => setSelectedProduct({...product, count: 0})}
        showProductDetails={() => {
          document.body.style.overflow = 'hidden'
          setProductDetailsVisibility(true)
        }}
      />
    ) 
  }) || []

  const [productDetailsVisible, setProductDetailsVisibility] = useState(false)

  const [basket, setBasket] = useState([])

  function increaseCount(p) {
    setBasket(prev => prev.map(product => product.id == p.id ? {...product, count: product.count + 1} : product))
  }

  function decreaseCount(p) {
    setBasket(prev => 
      prev
        .map(product => (product.id === p.id && product.count > 0) ? {...product, count: product.count - 1} : product)
        .filter(product => product.count > 0)
    )
  }

  const [basketItemsCount, setBasketItemsCount] = useState(0)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    let count = 0
    let total = 0
    basket.map(product => {
      count += product.count
      total += product.count * product.price
    })
    setBasketItemsCount(count)
    setTotal(total)
  }, [basket])

  const [basketVisibility, setBasketVisibility] = useState(false)
  const basketProducts = basket.map(product => {
    return <BasketProduct 
      id={product.id}
      imgUrl={product.bgUrl}
      title={product.title}
      count={product.count}
      increaseCount={() => increaseCount(product)}
      decreaseCount={() => decreaseCount(product)}
      removeFromBasket={() => setBasket(prev => prev.filter(p => p.id != product.id))}
      selectedLanguage={selectedLanguage}
      langs={langs}
    />
  })

  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [matchedProducts, setMatchedProducts] = useState([])
  useEffect(() => {
    setMatchedProducts(data.flatMap(category => category.translations[selectedLanguage].content.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))))
  }, [searchTerm])

  const matchedProductElements = matchedProducts.map(product => {
    return  <Product
      id={product.id}
      bgUrl={product.bgUrl}
      title={product.title}
      description={product.description}
      price={product.price}
      selectedLanguage={selectedLanguage}
      langs={langs}
      setSelectedProduct={() => setSelectedProduct({...product, count: 0})}
      showProductDetails={() => {
        document.body.style.overflow = 'hidden'
        setProductDetailsVisibility(true)
      }}
    />
  })

  useEffect(() => {
    setBasket([])
  }, [selectedLanguage])

  const [sidebarVisibility, setSidebarVisibility] = useState(false)




  return (
    <div className='max-w-lg relative mx-auto'>
      {/* HEADER */}
      <Header
        showBasket={() => setBasketVisibility(true)}
        basketItemsCount={basketItemsCount}
        searchBoxVisibility={searchBoxVisibility}
        showHideSearchBox={() => {
          setSearchBoxVisibility(prev => !prev)
          setSearchTerm('')
        }}
        searchTerm={searchTerm}
        setSearchTerm={(e) => setSearchTerm(e.target.value)}
        selectedLanguage={selectedLanguage}
        langs={langs}
        setSelectedLanguage={(e) => setSelectedLanguage(e.target.value)}
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
      />

      <div className='bg-white translate-y-[-90px] z-40 mx-[25px] p-[25px]'>
        {/* BACK BUTTON */}
        {
          selectedCategory != null
          && 
          <div 
            className='cursor-pointer flex items-center gap-[5px] mb-[15px]'
            onClick={() => setSelectedCategory(null)}
          >
            <FaChevronLeft className='text-xs' />
            <p>{langs.translations[selectedLanguage].backButton}</p>
          </div>
    
        }

        {/* CATEGORIES/PRODUCTS/MATCHED PRODUCTS */}
        <div className="w-full max-w-full min-h-screen grid grid-cols-2 gap-[5px]">
          {
            searchTerm == ''
            ?
            (
              selectedCategory == null
              ?
              categories
              :
              categoryProducts
            )
            : 
            matchedProductElements
          }
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      {
        productDetailsVisible &&
        <Details 
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        selectedLanguage={selectedLanguage}
        langs={langs}
        basket={basket}
        addToBasket={() => setBasket(prev => [...prev, {...selectedProduct, count: 1}])}
        increaseCount={() => increaseCount(selectedProduct)}
        decreaseCount={() => decreaseCount(selectedProduct)}
        hideProductDetails={() => setProductDetailsVisibility(false)}
        />
      }

      {/* BASKET */}
      {
        basketVisibility &&
        <div className='bg-[#50110A] h-dvh w-full absolute top-0 left-0 p-[25px]'>
          <div className='flex justify-between mb-[50px]'>
            <IoMdClose 
              className="cursor-pointer text-white text-xl"
              onClick={() => setBasketVisibility(false)}
            />
            {
              basket.length > 1 &&
              <button 
                className='text-white text-sm'
                onClick={() => setBasket([])}
              >{langs.translations[selectedLanguage].clearBasketButton}</button>
            }
          </div>
          {
            basketItemsCount > 0 
            ?
            basketProducts
            :
            <p className='text-white'>{langs.translations[selectedLanguage].basketEmpty}</p>
          }
          {
            total > 0 &&
            <div className='bg-white text-[#50110A] w-[50%] flex justify-center items-end gap-[7px] rounded-[25px] px-[25px] py-[15px]'>
              <p>{langs.translations[selectedLanguage].checkout}:</p>
              <p className='text-xl font-bold'>{langs.translations[selectedLanguage].currency}{total}</p>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default App