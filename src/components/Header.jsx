import "../css/Header.css";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					variant="h6"
					component={Link}
					to="/"
					className="logo"
				>
					Bookstore
				</Typography>
				<div className="nav-links">
					<Typography
						variant="body1"
						component={Link}
						to="/add"
						className="nav-link"
					>
						<IconButton
							aria-label="Add Icon"
							disableFocusRipple={true}
							disableRipple={true}
						>
							<AddIcon />
						</IconButton>
						Add new book
					</Typography>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
