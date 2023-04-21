/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Discover from './scenes/discover';
import Layout from './scenes/layout';
import { ThemeContext } from './context/ThemeContext';
import { SearchContext } from './context/SearchContext';
import { useDebounce } from './hooks/useDebounce';
function App() {
	const [data, setData] = useState([]);
	const [mode, setMode] = useState('dark');
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	const themeValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);
	const searchValue = useMemo(
		() => ({ search, setSearch }),
		[search, setSearch]
	);

	const getData = () => {
		fetch('data.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setData(myJson);
			});
	};

	const filterSearch = (searchTerm) => {
		if (searchTerm === '') getData();
		else {
			let filteredData = data.filter((item) =>
				item.Title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setData(filteredData);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		filterSearch(debouncedSearch);
	}, [debouncedSearch]);
	return (
		<div className="app">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<ThemeContext.Provider value={themeValue}>
						<Routes>
							<Route
								element={
									<SearchContext.Provider value={searchValue}>
										<Layout />
									</SearchContext.Provider>
								}
							>
								<Route path="/" element={<Navigate to="/discover" replace />} />
								<Route path="/discover" element={<Discover data={data} />} />
							</Route>
						</Routes>
					</ThemeContext.Provider>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;

// Actors,
// Awards,
// Country,
// Director,
// Genre,
// Images,
// Language,
// Metascore,
// Plot,
// Poster,
// Rated,
// Released,
// Response,
// Runtime,
// Title,
// Type,
// Writer,
// Year,
// imdbID,
// imdbRating,
// imdbVotes
