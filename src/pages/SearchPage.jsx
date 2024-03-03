import "../css/SearchPage.css";
import { Typography, TextField, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import booksData from "../data/books.json";
import Filter from "../components/Filter";

function extractPropertyValues(book, property) {
	const propertyValue = book[property];
	if (typeof propertyValue === "string") {
		return propertyValue.split(";").map((value) => value.trim());
	} else {
		return propertyValue;
	}
}

function getUniqueValuesForProperty(books, property) {
	const allValues = [
		...new Set(
			books.map((book) => extractPropertyValues(book, property)).flat()
		),
	];
	allValues.sort();
	return allValues;
}

export default function SearchPage() {
	const books = booksData.books;
	const [booksToShow, setBooksToShow] = useState(books);
	const [searchTerm, setSearchTerm] = useState("");
	const [bookResultsPage, setBookResultsPage] = useState(1);
	const filters = [
		{
			key: "category",
			value: "Category",
		},
		{
			key: "author",
			value: "Author",
		},
		{
			key: "year",
			value: "Year",
		},
	];
	const booksPerPage = 12;

	const allFiltersItems = filters.reduce((accumulator, filter) => {
		accumulator[filter.key] = getUniqueValuesForProperty(books, filter.key);
		return accumulator;
	}, {});

	const [selectedFiltersItems, setSelectedFiltersItems] = useState(
		Object.fromEntries(filters.map((filter) => [filter.key, []]))
	);

	useEffect(() => {
		let filteredBooks = books;

		// Applying selected filters
		filters.forEach((filter) => {
			if (selectedFiltersItems[filter.key].length) {
				filteredBooks = books.filter((book) => {
					const filterItems = extractPropertyValues(book, filter.key);
					if (Array.isArray(filterItems)) {
						return filterItems.some((filterItem) =>
							selectedFiltersItems[filter.key].includes(
								filterItem
							)
						);
					} else {
						return selectedFiltersItems[filter.key].includes(
							filterItems
						);
					}
				});
			}
		});

		// Applying search term
		filteredBooks = filteredBooks.filter((book) => {
			const bookInfo = Object.values(book).join(" ");
			return bookInfo.toLowerCase().includes(searchTerm);
		});

		setBooksToShow(filteredBooks);
		setBookResultsPage(1);

		// eslint-disable-next-line
	}, [selectedFiltersItems, searchTerm]);

	function handlePaginationClick(page) {
		setBookResultsPage(page);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	return (
		<main>
			<section id="search-page-introduction-section">
				<Typography variant="h4" component="h4">
					Welcome to our bookstore!
				</Typography>
				<Typography variant="body1" component="p">
					Find your next book easily! Type keywords, author names, or
					book titles into the search bar, or use the filters to
					refine your choices by category, year or author.
				</Typography>
			</section>
			<section id="apply-filters-section">
				<TextField
					id="book-search-bar"
					label="Search"
					variant="outlined"
					onChange={(e) => setSearchTerm(e.target.value)}
					size="small"
					fullWidth
				/>
				<div id="dropdown-filters-container">
					{filters.map((filter) => (
						<Filter
							filterLabel={filter.value}
							filterKey={filter.key}
							allFiltersItems={allFiltersItems[filter.key]}
							selectedFiltersItems={
								selectedFiltersItems[filter.key]
							}
							setSelectedFiltersItems={setSelectedFiltersItems}
							key={filter.key}
						/>
					))}
				</div>
			</section>
			<section id="show-results-section">
				<div id="book-results">
					{booksToShow.length ? (
						booksToShow.map(
							(book, bookIndex) =>
								bookIndex >=
									(bookResultsPage - 1) * booksPerPage &&
								bookIndex < bookResultsPage * booksPerPage && (
									<BookCard
										key={"book-card-" + book.title}
										book={book}
									/>
								)
						)
					) : (
						<div id="no-book-results">
							{'No results for "' + searchTerm + '"'}
						</div>
					)}
				</div>

				<Pagination
					page={bookResultsPage}
					onChange={(e, page) => handlePaginationClick(page)}
					count={Math.ceil(booksToShow.length / booksPerPage)}
				/>
			</section>
		</main>
	);
}
