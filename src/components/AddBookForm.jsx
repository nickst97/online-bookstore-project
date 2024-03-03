import { MuiFileInput } from "mui-file-input";
import { Typography, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import DataEntryField from "./DataEntryField";

export default function AddBookForm({
	bookFields,
	bookIndex,
	setAddedBooks,
	setBooksWithErrors,
}) {
	const [addedBook, setAddedBook] = useState({});
	const [typedData, setTypedData] = useState({});
	const [bookCover, setBookCover] = useState(null);
	const [fieldErrors, setFieldErrors] = useState(
		Object.fromEntries(bookFields.map((field) => [field, null]))
	);

	const handleBookCoverUpload = (newValue) => {
		setBookCover(newValue);
		const addedBookUpdated = { ...addedBook };
		addedBookUpdated.image = newValue;
		setAddedBook(addedBookUpdated);
	};

	function stringHasSpecialChars(inputString) {
		const specialChars = inputString.match(/[^a-zA-Z0-9@#&*! ]/g);
		return specialChars !== null;
	}

	useEffect(() => {
		if (typedData.value !== "") {
			const fieldErrorsUpdated = { ...fieldErrors };
			const addedBookUpdated = { ...addedBook };
			if (typedData.type === "title") {
				if (typedData.value.length < 10) {
					fieldErrorsUpdated[typedData.type] =
						"Book title must have at least 10 characters";
				} else if (typedData.value.length > 120) {
					fieldErrorsUpdated[typedData.type] =
						"Book title can have up to 120 characters";
				} else if (stringHasSpecialChars(typedData.value)) {
					fieldErrorsUpdated[typedData.type] =
						"Book title support only the following special characters: @, ”, #, &, *, !";
				} else {
					fieldErrorsUpdated[typedData.type] = null;
					addedBookUpdated[typedData.type] = typedData.value;
				}
			} else if (typedData.type === "description") {
				if (typedData.value.length > 512) {
					fieldErrorsUpdated[typedData.type] =
						"Book title can have up to 512 characters";
				} else if (
					typedData.value[0] !== typedData.value[0].toUpperCase()
				) {
					fieldErrorsUpdated[typedData.type] =
						"Book must start with the first letter uppercase";
				} else {
					fieldErrorsUpdated[typedData.type] = null;
					addedBookUpdated[typedData.type] = typedData.value;
				}
			} else if (typedData.type === "category") {
				if (typedData.value.split(";").length > 4) {
					fieldErrorsUpdated[typedData.type] =
						"Book can have up to 4 categories";
				} else {
					fieldErrorsUpdated[typedData.type] = null;
					addedBookUpdated[typedData.type] = typedData.value;
				}
			} else if (typedData.type === "author") {
				if (typedData.value.split(";").length > 3) {
					fieldErrorsUpdated[typedData.type] =
						"Book can have up to 3 authors";
				} else {
					fieldErrorsUpdated[typedData.type] = null;
					addedBookUpdated[typedData.type] = typedData.value;
				}
			} else if (typedData.type === "publisher") {
				if (typedData.value.length < 5) {
					fieldErrorsUpdated[typedData.type] =
						"Book publisher must have at least 5 characters";
				} else if (typedData.value.length > 60) {
					fieldErrorsUpdated[typedData.type] =
						"Book publisher can have up to 60 characters";
				} else {
					fieldErrorsUpdated[typedData.type] = null;
					addedBookUpdated[typedData.type] = typedData.value;
				}
			} else if (typedData.type === "year") {
				if (
					typedData.value.length !== 4 ||
					!/^\d+$/.test(typedData.value)
				) {
					fieldErrorsUpdated[typedData.type] = "Insert a valid year";
				} else {
					fieldErrorsUpdated[typedData.type] = null;
					addedBookUpdated[typedData.type] = typedData.value;
				}
			} else if (typedData.type === "pages") {
				if (typedData.value > 9999) {
					fieldErrorsUpdated[typedData.type] =
						"Book can contain up to 9999 pages";
				} else if (
					typedData.value < 0 ||
					!/^\d+$/.test(typedData.value)
				) {
					fieldErrorsUpdated[typedData.type] =
						"Insert a valid number of pages";
				} else {
					fieldErrorsUpdated[typedData.type] = null;
					addedBookUpdated[typedData.type] = typedData.value;
				}
			} else if (
				typeof typedData.type === "string" &&
				typedData.type.startsWith("isbn")
			) {
				const isbnChars = typedData.type.replace("isbn", "");
				if (typedData.value.length !== parseInt(isbnChars)) {
					fieldErrorsUpdated[typedData.type] =
						"Isbn" +
						isbnChars +
						" must have " +
						isbnChars +
						" digits";
				} else {
					fieldErrorsUpdated[typedData.type] = null;
					addedBookUpdated[typedData.type] = typedData.value;
				}
			}

			setFieldErrors(fieldErrorsUpdated);
			setAddedBook(addedBookUpdated);
		}
		// eslint-disable-next-line
	}, [typedData]);

	useEffect(() => {
		setAddedBooks((prevAddedBooks) => {
			const addedBooksUpdated = [...prevAddedBooks];
			addedBooksUpdated[bookIndex] = addedBook;
			return addedBooksUpdated;
		});
		// eslint-disable-next-line
	}, [addedBook, bookIndex]);

	useEffect(() => {
		const bookHasErrors = Object.values(fieldErrors).some(
			(fieldError) => fieldError !== null
		);

		setBooksWithErrors((prevAddedBooksWithErrors) => {
			const addedAddedBooksWithErrors = [...prevAddedBooksWithErrors];
			addedAddedBooksWithErrors[bookIndex] = bookHasErrors;
			return addedAddedBooksWithErrors;
		});
		// eslint-disable-next-line
	}, [fieldErrors]);

	return (
		<div className="add-book-form" key={"add-book-form-" + bookIndex}>
			{bookFields.map((bookField) => {
				if (bookField === "rating") {
					return (
						<div
							id={"book-data-entry-" + bookField}
							key={"book-data-entry-" + bookField}
						>
							<Typography>Rating</Typography>
							<Rating
								size="large"
								onChange={(e, bookRating) => {
									const addedBookUpdated = {
										...addedBook,
									};
									addedBookUpdated.rating = bookRating;
									setAddedBook(addedBookUpdated);
								}}
							/>
						</div>
					);
				} else if (bookField === "image") {
					return (
						<div
							id={"book-data-entry-" + bookField}
							key={"book-data-entry-" + bookField}
						>
							<MuiFileInput
								value={bookCover}
								onChange={handleBookCoverUpload}
								placeholder="Insert your book cover"
								size="small"
							/>
							{bookCover ? (
								<img
									src={URL.createObjectURL(bookCover)}
									alt="added-book-cover"
								/>
							) : (
								<div id="empty-image-container" />
							)}
						</div>
					);
				} else {
					return (
						<DataEntryField
							key={"book-data-entry-" + bookField}
							fieldType={bookField}
							setTypedData={setTypedData}
							fieldError={fieldErrors[bookField]}
						/>
					);
				}
			})}
		</div>
	);
}
