import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications'
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import NavBar from '../components/navbar';
import api from '../API/api';

function AddProduct() {

  const { addToast } = useToasts()
  const navigate = useNavigate()

  const [loader, setLoader] = useState(false)
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    productName: "",
    brandName: "",
    description: "",
    price: "",
    category: "",
    image: ""
  })

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prevState => ({
          ...prevState,
          image: reader.result
        }))
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
      setFormData(prevState => ({
        ...prevState,
        image: ''
      }))
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true)
      const data = new FormData();
      data.append('productName', formData.productName);
      data.append('brandName', formData.brandName);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('image', formData.image);

      console.log(data)
      await api.post('/add', data, config);

      setFormData({
        productName: "",
        brandName: "",
        description: "",
        price: "",
        category: "",
        image: ""
      });
      setImagePreview('');

      addToast('Product added successfully!', { appearance: 'success', autoDismiss: true });
      navigate('/')
    } catch (error) {
      console.error('Error adding product:', error);
    }
    setLoader(false)
  };

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories/get');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();

  }, []);

  return (
    <>
      <NavBar />
      {loader && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/80 z-50">
          <BeatLoader color="#36d7b7" />
        </div>
      )}
      <section className="shadow-2xl max-w-4xl p-6 mx-auto bg-slate-600 rounded-md text-white mt-20" style={{ boxShadow: '0px 0px 30px 10px rgba(0, 0, 0, 0.2)' }}>
        <h1 className="text-xl font-bold capitalize">ADD NEW PRODUCT</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="productName">Product name</label>
              <input value={formData.productName} onChange={(e) => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} name='productName' id="productName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="brandName">Brand name</label>
              <input value={formData.brandName} onChange={(e) => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} name='brandName' id="brandName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="price">Price</label>
              <input value={formData.price} onChange={(e) => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} name='price' id="price" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="category">Select</label>
              <select
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formData.category}
                onChange={(e) => setFormData(prevState => ({ ...prevState, category: e.target.value }))}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="description">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} name='description' id="description" type="textarea" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {imagePreview ? (
                  <img src={imagePreview} alt="Uploaded" className="h-32 w-auto object-cover mx-auto" />
                ) : (
                  <>
                    <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex justify-center p-2 text-sm text-gray-600">
                      <label htmlFor="file-upload" className="cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload image</span>
                        <input accept='image/*' id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-white">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddProduct;