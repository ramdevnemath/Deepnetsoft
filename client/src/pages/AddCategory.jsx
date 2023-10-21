import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';
import api from '../API/api';
import NavBar from '../components/navbar'

function AddCategory() {

    const { addToast } = useToasts()
    const navigate = useNavigate()

    const [parentCategories, setParentCategories] = useState([]);
    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        parentId: ""
    })

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoader(true);
        try {
            const response = await api.post('/category/create', formData);
            const data = await response.data
            setParentCategories(data);
            addToast("Category added succesfully!", { appearance: "success", autoDismiss: true })
            navigate('/')
        } catch (error) {
            console.error('Error fetching categories', error);
            addToast('Error creating categories', { appearance: "error", autoDismiss: true })
        }
        setLoader(false)
    };

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories/get');
                setParentCategories(response.data);
                console.log(parentCategories.length)
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories();

    }, []);

    return (
        <>
            <NavBar />
            <div className='flex items-center justify-center h-[100vh]'>
                {loader && (
                    <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/80 z-50">
                        <BeatLoader color="#36d7b7" />
                    </div>
                )}
                <div className="text-center mb-6 mr-40">
                    <h2 className="text-3xl font-semibold mb-2">Add Category</h2>
                    <p className="text-gray-500 text-sm">Enter details in the form to create a new category.</p>
                </div>
                <div className="shadow-2xl w-full max-w-xs" style={{ boxShadow: '0px 0px 30px 10px rgba(0, 0, 0, 0.2)' }}>
                    <form onSubmit={handleOnSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Category name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Category name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                type="text"
                                placeholder="Explain your category"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parentCategory">
                                Parent Category
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="parentCategory"
                                value={formData.parentId}
                                onChange={(e) => {
                                    const selectedCategoryId = e.target.value;
                                    const selectedCategory = parentCategories.find(category => category._id === selectedCategoryId);
                                    setFormData({ ...formData, parentId: selectedCategory ? selectedCategory._id : '' });
                                }}
                            >

                                <option value="">Select Parent Category</option>
                                {parentCategories.length > 0 &&
                                    parentCategories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCategory