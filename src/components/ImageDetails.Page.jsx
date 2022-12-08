export function ImageDetailsPage({ title, artist, imageId, goBack }) {
	return (
		<div>
			<h1>
				{title} by {artist}
			</h1>
			<button onClick={goBack}>Go Back</button>
			<img
				alt={title}
				src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
			/>
		</div>
	);
}
