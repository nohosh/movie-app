import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Collapse,
	Grid,
	Typography,
	Zoom,
} from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { AddCircleOutline, PlayCircleOutline } from '@mui/icons-material';

function Row({
	isNonMobile,
	movies,
	handleRowClick,
	setSelectedMovie,
	selectedMovie,
	expanded,
	activeRow,
	row,
}) {
	const [selectedItem, setSelectedItem] = useState();
	const theme = useTheme();

	const gridStyle = isNonMobile ? { maxWidth: '50%' } : { maxWidth: '100%' };

	const MovieCard = ({ row, movie, handleClickOnItem, idx }) => {
		let titleConcat =
			movie.Title.split('').length > 20
				? movie.Title.slice(0, 19) + '...'
				: movie.Title;

		return (
			<Card
				sx={{
					backgroundColor: theme.palette.primary[700],
					cursor: 'pointer',
					borderRadius: '1rem',
					border:
						activeRow === row && selectedItem === idx
							? `2px solid ${theme.palette.primary[800]}`
							: 'none',
				}}
			>
				<CardActionArea height="21rem" onClick={() => handleClickOnItem(movie)}>
					<CardMedia
						sx={{ p: '0.5rem', width: '11rem', borderRadius: '1rem' }}
						component="img"
						height="210"
						image={movie.Images[0]}
						alt="green iguana"
					/>
					<CardContent sx={{ padding: '0.5rem', margin: '0 0 0.5rem 0' }}>
						<Typography mb="0.5rem" variant="h6" component="div">
							{titleConcat}
						</Typography>
						<Box display="flex" width="30%" justifyContent="space-between">
							<PlayCircleOutline />
							<AddCircleOutline />
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	};

	const handleClickAndSetStates = (R, I, movie) => {
		handleRowClick(R);
		setSelectedItem(I);
		setSelectedMovie(movie);
	};
	return (
		<Box>
			<Collapse in={expanded} sx={{ mb: '2rem' }}>
				{selectedMovie && (
					<Card
						sx={{
							display: 'flex',
							background: theme.palette.primary[700],
							borderRadius: '1rem',
						}}
					>
						<CardMedia
							component="img"
							sx={{ width: '33%' }}
							image={selectedMovie.Images[0]}
							alt="movie cover"
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								margin: '0 0 1rem 1.5rem',
							}}
						>
							<CardContent sx={{ flex: '1 0 auto', paddingBottom: '0' }}>
								<Typography component="div" variant="h2">
									{selectedMovie.Title}
								</Typography>
								<Box display="flex" alignItems="center" gap="1rem">
									<Box
										sx={{
											height: '8px',
											width: '25%',
											backgroundColor: theme.palette.grey[900],
											borderRadius: '1rem',
											m: '1rem 0rem',
										}}
									>
										<Zoom
											in={expanded}
											style={{ transitionDelay: expanded ? '300ms' : '0ms' }}
										>
											<Box
												sx={{
													width: `${selectedMovie.imdbRating * 10}%`,
													background: theme.palette.primary[800],
													height: '8px',
													borderRadius: '1rem',
												}}
											></Box>
										</Zoom>
									</Box>
									{selectedMovie.imdbRating}/10
								</Box>

								<Grid
									container
									rowSpacing={1}
									m={1}
									sx={gridStyle}
									columnSpacing={{ xs: 1, sm: 1, md: 1 }}
								>
									<Grid item xs={6}>
										Year:
									</Grid>
									<Grid item xs={6}>
										{selectedMovie.Year}
									</Grid>
									<Grid item xs={6}>
										Run Time:
									</Grid>
									<Grid item xs={6}>
										{selectedMovie.Runtime}
									</Grid>
									<Grid item xs={6}>
										Directed by:
									</Grid>
									<Grid item xs={6}>
										{selectedMovie.Director}
									</Grid>
									<Grid item xs={6}>
										Language:
									</Grid>
									<Grid item xs={6}>
										{selectedMovie.Language}
									</Grid>
								</Grid>
							</CardContent>
							<Typography sx={{ p: 1, m: 1 }}>{selectedMovie.Plot}</Typography>
							<Box
								sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
								gap={'1rem'}
							>
								<Button
									sx={{
										background: theme.palette.primary[800],
										borderRadius: '0.2rem',
									}}
									variant="contained"
								>
									Play Movie
								</Button>
								<Button
									sx={{
										color: theme.palette.primary[800],
										borderRadius: '0.2rem',
									}}
									variant="outlined"
								>
									Watch Trailer
								</Button>
							</Box>
						</Box>
					</Card>
				)}
			</Collapse>

			<Box display="flex" mb={4} justifyContent="space-between">
				{movies.map((movie, i) => (
					<MovieCard
						row={row}
						handleClickOnItem={() => handleClickAndSetStates(row, i, movie)}
						key={movie.Title}
						movie={movie}
						idx={i}
					/>
				))}
			</Box>
		</Box>
	);
}

export default Row;
