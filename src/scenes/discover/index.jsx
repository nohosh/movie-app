import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Row from './Row';

const Discover = ({ data }) => {
	const [arr, setArr] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const [activeRow, setActiveRow] = useState();
	function* chunks(arr, n) {
		for (let i = 0; i < arr.length; i += n) {
			yield arr.slice(i, i + n);
		}
	}

	const handleChange = useCallback((idx) => {
		setActiveRow(idx);
		setArr((prev) =>
			prev.map((item, i) => {
				return idx === i
					? { ...item, expanded: true }
					: { ...item, expanded: false };
			})
		);
	}, []);

	useEffect(() => {
		let ARR = [];
		const rowSize = isNonMobile ? 5 : 2;
		const chunksArr = [...chunks(data, rowSize)];
		for (let i = 0; i < chunksArr.length; i++) {
			ARR[i] = { data: chunksArr[i], expanded: false };
		}

		setArr(ARR);
	}, [data, isNonMobile]);

	return (
		<Box m={isNonMobile ? 3 : 0} p={1}>
			{data.length > 0 ? (
				arr.map(({ data, expanded }, idx) => (
					<Row
						key={idx}
						activeRow={activeRow}
						handleRowClick={() => handleChange(idx)}
						isNonMobile={isNonMobile}
						setSelectedMovie={setSelectedMovie}
						selectedMovie={selectedMovie}
						row={idx}
						movies={data}
						expanded={expanded}
					/>
				))
			) : (
				<Typography>No results found for your dearch.</Typography>
			)}
		</Box>
	);
};

export default Discover;
