import './SearchForm.css';

import { useState } from 'react';

export function SearchForm({ onSearchSubmit }) {
	const [query, setQuery] = useState('');

	function handleInputChange(evt) {
		setQuery(evt.target.value);
	}

	function handleFormSubmit(evt) {
		// Prevent the browser from refreshing when form is submitted.
		// Resolves issue #2
		evt.preventDefault();
		onSearchSubmit(query);
	}

	return (
		<form className="Form" role="search" onSubmit={handleFormSubmit}>
			<label className="label" htmlFor="search-field">
				Search for some art
			</label>
			<input
				className="input"
				id="search-field"
				inputMode="search"
				name="query"
				type="text"
				value={query}
				onChange={handleInputChange}
			/>
			<button className="button" type="submit">
				Search
			</button>
		</form>
	);
}
