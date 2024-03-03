import { useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Rating,
} from "@mui/material";

export default function BookCard({
	book,
	showRating = true,
	cardSize = "large",
}) {
	const navigate = useNavigate();
	const cardDimensions = {
		small: { width: 150, height: 170 },
		large: { width: 200, height: 280 },
	};
	return (
		<Card
			className="book-card"
			onClick={() => {
				navigate("/book/" + book.isbn10);
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			}}
			sx={{
				width: cardDimensions[cardSize].width,
			}}
		>
			<CardMedia
				sx={{
					height: cardDimensions[cardSize].height,
				}}
				image={book.image}
				title={book.title}
			/>
			<CardContent>
				<Typography gutterBottom className="book-card-title">
					{book.title}
				</Typography>
				{showRating && <Rating value={book.rating} readOnly />}
			</CardContent>
		</Card>
	);
}
