import { getDirectoryDocuments, addCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
import {useEffect, useState} from 'react';

import DirectoryItem from '../directory-item/directory-item.component'
import Spinner from '../spinner/spinner.component'

// import DIRECTORY_DATA from '../../directory-data.js'
// import SHOP_DATA from '../../shop-data.js'

import './directory.styles.scss'
  
const Directory = () => {

	const [directoryArray, setDirectoryArray] = useState([]);
	const [loading, setLoading] = useState(true)
	 // useEffect(() => {
	 //   	addCollectionAndDocuments('categories', SHOP_DATA)
	 //   }, [])
	
	useEffect(() => {
	    const getDirectoryMap = async () => {
	      try {
	        const directoryArray = await getDirectoryDocuments();
	        setDirectoryArray(directoryArray);
	        setLoading(false)
		   } catch (error) {
		      console.error('Error fetching directory:', error);
		   }
		};

		getDirectoryMap();
	}, []);
	console.log(directoryArray)
	return (
		<div className="directory-container">	
		{loading ? (
	        <Spinner /> // Display spinner while loading
	      ) : (
	        <>	
		     {directoryArray.map((category) => (		     	
		      <DirectoryItem key={category.id} category={category}/>
		    ))}
		  	 </>
		  	)}
	    </div>
	)
}

export default Directory