import {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments,addCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';
import DIRECTORY_DATA from '../../directory-data.js'
//import SHOP_DATA from '../../shop-data.js'

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  	addCollectionAndDocuments('directory', DIRECTORY_DATA)
  }, [])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
  }, []);

	return(
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	)
};

export default Shop;