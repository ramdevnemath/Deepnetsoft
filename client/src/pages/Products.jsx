import React, { useEffect, useState } from 'react'
import api from '../API/api'
import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from '@material-tailwind/react'
import NavBar from '../components/navbar'

function Products() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCategoryId, setSelectedCategoryId] = useState('All')

  useEffect(() => {

    const fetchData = async () => {

      try {
        const productsResponse = await api.get('/get');
        const categoriesResponse = await api.get('/categories/get');
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleCatClick = (categoryId) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? 'All' : categoryId)
  }

  const handleCategoryClick = async (categoryId) => {
    const response = await api.get(`/sub-categories/get/${categoryId}`)
    const subCategoryIds = response.data.map(subCategory => subCategory._id);
    setSelectedCategory(categoryId === selectedCategory ? 'All' : categoryId);
    setSelectedCategoryId(categoryId === selectedCategoryId ? 'All' : subCategoryIds)
  };

  const filteredProduct = selectedCategoryId === 'All'
    ? products
    : Array.isArray(selectedCategoryId)
      ? products.filter((product) => selectedCategoryId.includes(product.category))
      : products.filter((product) => product.category === selectedCategoryId);


  return (
    <>
      <NavBar />
      <div className='flex'>
        <div>
          <div onClick={() => setSelectedCategoryId('All')} style={{ cursor: 'pointer', color: 'blue' }}>All products</div>
          {categories
            .filter((category) => !category.parentId)
            .map((mainCategory) => (
              <div key={mainCategory._id}>
                <div
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => handleCategoryClick(mainCategory._id)}
                >
                  {mainCategory.name}
                </div>
                {selectedCategory === mainCategory._id &&
                  categories
                    .filter((category) => category.parentId === mainCategory._id)
                    .map((subCategory) => (
                      <div
                        key={subCategory._id}
                        style={{ marginLeft: '20px', cursor:'pointer', color: 'blue' }}
                        onClick={() => handleCatClick(subCategory._id)}
                      >
                        {subCategory.name}
                      </div>
                    ))}
              </div>
            ))}
        </div>
        <div className='flex'>
          {filteredProduct.map((product) => (
            <Card className="w-80 m-5 rounded bg-slate-300" key={product._id}>
              <CardHeader shadow={false} floated={false} className="h-80 border-2">
                <img
                  src={product.image}
                  alt="card-image"
                  className="h-full w-full object-contain"
                />
              </CardHeader>
              <CardBody className='shadow-lg rounded'>
                <div className="mb-2 flex items-center justify-between">
                  <Typography color="blue-gray" className="font-medium">
                    {product.brandName} | {product.productName}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    ₹{product.price}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  {product.description}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default Products