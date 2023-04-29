import React from 'react';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import {
	SettingsOutlined,
	ChevronLeft,
	PlaylistPlay,
	Search,
	LiveTv,
	Tv,
	FormatListBulleted,
	Update,
	FavoriteBorder,
	Logout,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import profileImage from '../assets/me.jpeg';

const navItems = [
	{
		text: 'primary',
		icon: null,
	},
	{
		text: 'Discover',
		icon: <Search />,
	},
	{
		text: 'Playslist',
		icon: <PlaylistPlay />,
	},
	{
		text: 'Movie',
		icon: <LiveTv />,
	},
	{
		text: 'TV Shows',
		icon: <Tv />,
	},
	{
		text: 'My List',
		icon: <FormatListBulleted />,
	},

	{
		text: 'secondary',
		icon: null,
	},
	{
		text: 'Watch Later',
		icon: <Update />,
	},
	{
		text: 'Recomended',
		icon: <FavoriteBorder />,
	},
	{
		text: 'tertiary',
		icon: null,
	},
	{
		text: 'Settings',
		icon: <SettingsOutlined />,
	},
	{
		text: 'Logout',
		icon: <Logout />,
	},
];

const Sidebar = ({
	// user,
	drawerWidth,
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile,
}) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						'& .MuiDrawer-paper': {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.background.alt,
							boxSixing: 'border-box',
							borderWidth: isNonMobile ? 0 : '2px',
							width: drawerWidth,
						},
					}}
				>
					<Box width="100%">
						<Box m="2rem 2rem 0rem 2rem">
							<Box
								display="flex"
								justifyContent="space-around"
								color={theme.palette.secondary.main}
							>
								<Box
									display="flex"
									flexDirection="column"
									alignItems="center"
									justifyContent="space-between"
									gap="0.5rem"
								>
									<Box
										flexGrow={1}
										component="img"
										alt="profile"
										src={profileImage}
										height="40px"
										width="40px"
										borderRadius="50%"
										sx={{ objectFit: 'cover' }}
									/>
									<Box textAlign="center">
										<Typography
											fontWeight="bold"
											fontSize="0.9rem"
											sx={{ color: theme.palette.secondary[100] }}
										>
											{'Sanchit'}
										</Typography>
									</Box>
								</Box>
								{!isNonMobile && (
									<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
										<ChevronLeft />
									</IconButton>
								)}
							</Box>
						</Box>
						<List>
							{navItems.map(({ text, icon }) => {
								if (!icon) {
									return <Divider key={text} sx={{ m: '.5rem 0' }} />;
								}
								const lcText = text.toLowerCase();

								return (
									<ListItem key={text} disablePadding>
										<ListItemButton
											onClick={() => {
												navigate(`/${lcText}`);
												setActive(lcText);
											}}
											sx={{
												color:
													active === lcText
														? theme.palette.primary[800]
														: theme.palette.secondary[100],
												borderRight:
													active === lcText &&
													`2px solid ${theme.palette.primary[800]}`,
											}}
										>
											<ListItemIcon
												sx={{
													ml: '2rem',
													color:
														active === lcText
															? theme.palette.primary[800]
															: theme.palette.secondary[200],
												}}
											>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

export default Sidebar;
