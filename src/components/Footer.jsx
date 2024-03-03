import "../css/Footer.css";
import { Typography, Link } from "@mui/material";

const Footer = () => {
	return (
		<footer className="footer">
			<Typography variant="body2" color="textSecondary" align="center">
				Built by{" "}
				<Link
					href="https://nickst97.dev/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Nikolas Stavrakakis
				</Link>
				.
				<br />
				Book data provided by{" "}
				<Link
					href="https://www.kaggle.com/datasets/abdallahwagih/books-dataset/data"
					target="_blank"
					rel="noopener noreferrer"
				>
					Books Dataset
				</Link>
			</Typography>
		</footer>
	);
};

export default Footer;
