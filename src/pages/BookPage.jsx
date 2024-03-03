import "../css/BookPage.css";
import { Carousel } from "@trendyol-js/react-carousel";
import { Typography, IconButton, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import booksData from "../data/books.json";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ShareIcon from "@mui/icons-material/Share";

const BookPage = () => {
	const { isbn } = useParams();
	const book = booksData.books.filter((book) => book.isbn10 === isbn)[0];
	const [favoriteIconClicked, setFavoriteIconClicked] = useState(false);
	const [buyThisBookButtonMobile, setBuyThisBookButtonMobile] =
		useState(false);
	const [bookCarouselViewSettings, setBookCarouselViewSettings] = useState();
	const [carouselKey, setCarouselKey] = useState(0);
	const [otherBooks, setOtherBooks] = useState();

	const shuffleArray = (array) => {
		const shuffledArray = [...array];
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			];
		}
		return shuffledArray;
	};

	useEffect(() => {
		setCarouselKey("carousel-for-book-" + isbn);
		// To create the feeling of randomness
		const otherBooksUpdated = shuffleArray(
			booksData.books.filter((book) => book.isbn10 !== isbn)
		);
		setOtherBooks(otherBooksUpdated);
	}, [isbn]);

	useEffect(() => {
		const updateScreenWidth = () => {
			const currentWindowWidth = window.innerWidth;
			setBuyThisBookButtonMobile(currentWindowWidth < 770);
			if (currentWindowWidth < 610) {
				setBookCarouselViewSettings({
					show: 0.7,
					slide: 1,
				});
			} else if (currentWindowWidth < 750) {
				setBookCarouselViewSettings({
					show: 1.5,
					slide: 1,
				});
			} else if (currentWindowWidth < 960) {
				setBookCarouselViewSettings({
					show: 2.7,
					slide: 2,
				});
			} else {
				setBookCarouselViewSettings({
					show: 3.7,
					slide: 2,
				});
			}
		};
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);
		return () => {
			window.removeEventListener("resize", updateScreenWidth);
		};
	}, []);

	return (
		<main>
			<section id="main-book-section">
				<div id="book-cover-container">
					<img src={book.image} alt="book-cover" />
					<Rating size="large" readOnly value={book.rating} />
				</div>
				<div id="book-information-container">
					<div id="book-information-top-container">
						<div id="book-information-top-title-container">
							<Typography variant="h4" component="h4">
								{book.title}
							</Typography>
							<Typography variant="caption" component="h5">
								{book.author.replace(";", ", ")}
							</Typography>
						</div>
						<div id="book-information-top-buttons-container">
							<IconButton
								aria-label="Favorite"
								disableFocusRipple={true}
								disableRipple={true}
								onClick={() =>
									setFavoriteIconClicked(!favoriteIconClicked)
								}
								color="secondary"
							>
								{!favoriteIconClicked ? (
									<FavoriteBorderIcon />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<IconButton
								aria-label="Share"
								disableFocusRipple={true}
								disableRipple={true}
								color="secondary"
							>
								<ShareIcon />
							</IconButton>
						</div>
						{buyThisBookButtonMobile && (
							<button
								className="bookstore-button"
								id="buy-book-button"
							>
								Buy this book
							</button>
						)}
					</div>
					<div id="book-information-middle-container">
						<Typography
							variant="subtitle1"
							component="p"
							style={{ fontStyle: "italic" }}
						>
							{book.description.substring(0, 300) +
								(book.description.length > 300 ? "..." : "")}
						</Typography>
					</div>

					<div id="book-information-bottom-container">
						<div>
							<Typography variant="body2" component="p">
								Category: {book.category}
							</Typography>
							<Typography variant="body2" component="p">
								Year: {book.year}
							</Typography>
							<Typography variant="body2" component="p">
								Number of Pages: {book.pages}
							</Typography>
							<Typography variant="body2" component="p">
								Publisher:
								{book.publisher ? book.category : " -"}
							</Typography>
							<Typography variant="body2" component="p">
								ISBN-10: {book.isbn10}
							</Typography>
							<Typography variant="body2" component="p">
								ISBN-13: {book.isbn13}
							</Typography>
						</div>
						{!buyThisBookButtonMobile && (
							<button
								className="bookstore-button"
								id="buy-book-button"
								style={{ marginLeft: "auto" }}
							>
								Buy this book
							</button>
						)}
					</div>
				</div>
			</section>
			<section id="other-books-section">
				{bookCarouselViewSettings && otherBooks && (
					<Carousel
						key={carouselKey}
						leftArrow={
							<IconButton
								aria-label="Left Arrow"
								className="carousel-buttons"
								disableFocusRipple={true}
								disableRipple={true}
							>
								<KeyboardArrowLeftIcon />
							</IconButton>
						}
						rightArrow={
							<IconButton
								aria-label="Left Arrow"
								className="carousel-buttons"
								disableFocusRipple={true}
								disableRipple={true}
							>
								<KeyboardArrowRightIcon />
							</IconButton>
						}
						show={bookCarouselViewSettings.show}
						slide={bookCarouselViewSettings.slide}
						responsive={true}
					>
						{otherBooks.map((otherBook) => (
							<BookCard
								book={otherBook}
								showRating={false}
								cardSize="small"
								key={"other-book-" + otherBook.title}
							/>
						))}
					</Carousel>
				)}
			</section>
		</main>
	);
};

export default BookPage;
