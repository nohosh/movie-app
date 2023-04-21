import React, { useContext, useState } from 'react';
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	Close,
	MoreVert,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useTheme } from '@emotion/react';
import {
	AppBar,
	Box,
	Collapse,
	IconButton,
	InputBase,
	Toolbar,
} from '@mui/material';

import { ThemeContext } from '../context/ThemeContext';
import { SearchContext } from '../context/SearchContext';

function Navbar({ isSidebarOpen, setIsSidebarOpen, isNonMobile }) {
	const { search, setSearch } = useContext(SearchContext);
	const { mode, setMode } = useContext(ThemeContext);
	const theme = useTheme();
	const [showSearch, setShowSearch] = useState(false);
	return (
		<AppBar
			sx={{
				position: 'static',
				background: 'none',
				boxShadow: 'none',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box
					display="flex"
					justifyContent="flex-start"
					alignItems="center"
					width={isNonMobile ? 0.5 : 0.8}
				>
					{!isNonMobile && (
						<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
							<MenuIcon />
						</IconButton>
					)}
					{!showSearch && (
						<IconButton onClick={() => setShowSearch(true)}>
							<Search sx={{ cursor: 'pointer' }} margin="0" />
						</IconButton>
					)}
					<Collapse orientation="horizontal" in={showSearch}>
						<Box
							width="100%"
							padding={1}
							display="flex"
							alignItems="center"
							backgroundColor={
								showSearch ? theme.palette.background.alt : 'none'
							}
							borderRadius="9px"
							gap="0.5rem"
						>
							<Search
								sx={{ cursor: 'pointer' }}
								onClick={() => setShowSearch(true)}
								margin="0"
							/>

							<Box width="100%" display="flex" alignItems="center">
								<InputBase
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									inputRef={(input) => input && input.focus()}
									sx={{ minWidth: '30vw' }}
									placeholder="Title, Movie, Keyword"
								></InputBase>
								<Close
									onClick={() => setShowSearch(false)}
									sx={{ m: '0 0 0 auto', cursor: 'pointer' }}
								/>
							</Box>
						</Box>
					</Collapse>
				</Box>
				<FlexBetween gap="1.5rem">
					<IconButton
						onClick={() => {
							const newMode = mode === 'dark' ? 'light' : 'dark';
							setMode(newMode);
						}}
					>
						{theme.palette.mode === 'dark' ? (
							<DarkModeOutlined sx={{ fontSize: '25px' }} />
						) : (
							<LightModeOutlined sx={{ fontSize: '25px' }} />
						)}
					</IconButton>
					<IconButton>
						<MoreVert sx={{ fontSize: '25px' }} />
					</IconButton>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
