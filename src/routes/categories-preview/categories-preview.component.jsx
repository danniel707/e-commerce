import { Fragment} from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector'

import CategoryPreview from '../../components/category-preview/category-preview.component'
import ScrollTopButton from '../../components/scroll-top-button/scroll-top-button.component';

import Spinner from '../../components/spinner/spinner.component'

const CategoriesPreview = () => {

	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading)

	return(
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview key={title} title={title} products={products} />
				);
			})
			)}	

 			<ScrollTopButton />					
		</Fragment>
	)
};

export default CategoriesPreview;