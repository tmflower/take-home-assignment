export function ImageDetailsPage({ title, artist, imageId }) {
	return (
		<div>
			<h1>
				{title} by {artist}
			</h1>
			<img
				alt={title}
				src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
			/>
		</div>
	);
}
