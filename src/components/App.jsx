import './App.css';

import { searchArtworks } from '../utils/api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';
import { useState } from 'react';
import { ImageDetailsPage } from './ImageDetails.Page';

export function App() {
	// Initialize variable to store data returned from api request
	const [artList, setArtList] = useState([]);
	// Initialize variable to manage conditional rendering in return statement
	const [imageIsSelected, setImageIsSelected] = useState(false);
	// Iniitlize variables to store data for selected image
	const [imageId, setImageId] = useState('');
	const [artist, setArtist] = useState('');
	const [title, setTitle] = useState('');

	function onSearchSubmit(query) {
		// Hold the data from the api request in `artList`
		// Map over data in return statement to display title and artist
		// Resolves issue #3
		searchArtworks(query).then((json) => {
			setArtList(json.data);
		});
	}

	const goBack = () => {
		// Apply conditional rendering when user clicks back button to display list
		setImageIsSelected(false);
	};

	// If user has not submitted a search term, display only SearchForm
	// Display list of art titles and artists as links
	// When user clicks on link, render only ImageDetailsPage for selected artwork
	// When user clicks on back button, display list again
	// Resolves issues #4 and #5
	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			{imageIsSelected === false ? (
				<div>
					<SearchForm onSearchSubmit={onSearchSubmit} />
					{!artList.length ? (
						"Sorry, we can't find that artwork. Please try another search."
					) : (
						<p>Click on a link to see the art!</p>
					)}
					{artList.map((art, i) => (
						<div key={i}>
							<a
								href="http://localhost:3000/"
								onClick={(event) => {
									event.preventDefault();
									setImageIsSelected(true);
									setImageId(art.image_id);
									setArtist(art.artist_title);
									setTitle(art.title);
								}}
							>
								{art.title} by {art.artist_title}
							</a>
						</div>
					))}
				</div>
			) : (
				<div>
					<ImageDetailsPage
						artist={artist}
						goBack={goBack}
						imageId={imageId}
						title={title}
					></ImageDetailsPage>
				</div>
			)}
			<Footer />
		</div>
	);

	// return (
	// 	<div className="App">
	// 		<h1>TCL Career Lab Art Finder</h1>
	// 		{imageIsSelected === false ? (
	// 			<div>
	// 				<SearchForm onSearchSubmit={onSearchSubmit} />
	// 				{artList.map((art, i) => (
	// 					<div key={i}>
	// 						<button
	// 								className="ArtBtn"
	// 								onClick={(event) => {
	// 								setImageIsSelected(true);
	// 								setImageId(art.image_id);
	// 								setArtist(art.artist_title);
	// 								setTitle(art.title);
	// 							}}
	// 							>
	// 							{art.title} by {art.artist_title}
	// 						</button>
	// 					</div>
	// 				))}
	// 			</div>
	// 		) : (
	// 			<div>
	// 				<button onClick={goBack}>Go Back</button>
	// 				<ImageDetailsPage
	// 					artist={artist}
	// 					imageId={imageId}
	// 					title={title}
	// 				></ImageDetailsPage>
	// 			</div>
	// 		)}
	// 		<Footer />
	// 	</div>
	// );
}
