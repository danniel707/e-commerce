import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component'
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector'
import ScrollTopButton from '../../components/scroll-top-button/scroll-top-button.component';
import './category.styles.scss';

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const [products, setProducts ] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap])

	return (
		<Fragment>
			<h2 className='category-title'>{category.toUpperCase()}</h2>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='category-container'>			
				{products && 
					products.map((product) => ( 
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			)}
			
			<ScrollTopButton />		

		</Fragment>		
	)
};

export default Category;