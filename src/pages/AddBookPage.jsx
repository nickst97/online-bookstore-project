import "../css/AddBookPage.css";
import { Typography, Alert, Divider } from "@mui/material";
import AddBookForm from "../components/AddBookForm";
import React, { useState } from "react";

const AddBookPage = () => {
	const bookFields = [
		"title",
		"description",
		"category",
		"author",
		"publisher",
		"year",
		"pages",
		"isbn10",
		"isbn13",
		"rating",
		"image",
	];

	const [addedBooks, setAddedBooks] = useState([{}]);
	const [booksWithErrors, setBooksWithErrors] = useState([{}]);
	const [alertMessage, setAlertMessage] = useState(null);

	const handleAddBook = () => {
		setAddedBooks((prevAddedBooks) => [...prevAddedBooks, {}]);
		setAlertMessage(null);
	};

	const saveClicked = () => {
		if (booksWithErrors.some((booksWithError) => booksWithError === true)) {
			setAlertMessage({
				type: "error",
				message:
					"Please review your entries and make sure all fields are filled correctly",
			});
		} else if (
			addedBooks.some(
				(addedBook) =>
					Object.keys(addedBook).length !== bookFields.length
			)
		) {
			setAlertMessage({
				type: "error",
				message: "Please fill out all the fields",
			});
		} else {
			setAlertMessage({
				type: "success",
				message: `Book${
					addedBooks.length > 1 ? "s" : ""
				} added to the database successfully!`,
			});
		}
	};

	return (
		<main id="add-book-page">
			<section id="add-book-page-introduction-section">
				<Typography variant="h4" component="h4">
					Add a new book
				</Typography>
			</section>
			<section id="add-book-page-data-entry-section">
				{addedBooks.map((addedBook, addedBookIndex) => (
					<React.Fragment key={"added-book-" + addedBookIndex}>
						<AddBookForm
							bookFields={bookFields}
							bookIndex={addedBookIndex}
							setAddedBooks={setAddedBooks}
							setBooksWithErrors={setBooksWithErrors}
						/>
						{addedBookIndex !== addedBooks.length - 1 &&
							addedBooks.length > 1 && (
								<Divider
									style={{ width: "100%", marginBottom: 28 }}
								/>
							)}
					</React.Fragment>
				))}
			</section>
			{alertMessage && (
				<Alert severity={alertMessage.type}>
					{alertMessage.message}
				</Alert>
			)}
			<section id="add-book-page-button-section">
				<Typography id="add-other-book-button" onClick={handleAddBook}>
					Click to add another book
				</Typography>

				<button
					onClick={saveClicked}
					className="bookstore-button"
					id="save-book-button"
				>
					Save
				</button>
			</section>
		</main>
	);
};

export default AddBookPage;
