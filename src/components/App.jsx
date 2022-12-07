import './App.css';

import { searchArtworks } from '../utils/api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';
import { useState } from 'react';
import { ImageDetailsPage } from './ImageDetails.Page';

export function App() {
	const [artList, setArtList] = useState([]);
	const [imageIsSelected, setImageIsSelected] = useState(false);
	const [imageId, setImageId] = useState('');
	const [artist, setArtist] = useState('');
	const [title, setTitle] = useState('');

	function onSearchSubmit(query) {
		// Search for the users's query.
		// TODO: render the results, instead of logging them to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/uitls/api.js

		searchArtworks(query).then((json) => {
			setArtList(json.data);
		});
	}

	const goBack = () => {
		setImageIsSelected(false);
	};

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			{imageIsSelected === false ? (
				<div>
					<SearchForm onSearchSubmit={onSearchSubmit} />
					{artList.map((art, i) => (
						<div key={i}>
							<button
								className="ArtBtn"
								onClick={(event) => {
									setImageIsSelected(true);
									setImageId(art.image_id);
									setArtist(art.artist_title);
									setTitle(art.title);
								}}
							>
								{art.title} by {art.artist_title}
							</button>
						</div>
					))}
				</div>
			) : (
				<div>
					<button onClick={goBack}>Go Back</button>
					<ImageDetailsPage
						artist={artist}
						imageId={imageId}
						title={title}
					></ImageDetailsPage>
				</div>
			)}
			<Footer />
		</div>
	);
}
