import TextField from "@mui/material/TextField";

export default function DataEntryField({
	fieldType,
	setTypedData,
	fieldError,
}) {
	function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<TextField
			id={"book-data-entry-" + fieldType}
			label={capitalizeFirstLetter(fieldType)}
			variant="outlined"
			size="small"
			onBlur={(e) =>
				setTypedData({
					type: fieldType,
					value: e.target.value,
				})
			}
			type={
				["year", "pages", "isbn10", "isbn13"].includes(fieldType)
					? "number"
					: "string"
			}
			className="book-data-entry"
			error={fieldError !== null}
			helperText={
				fieldError !== null
					? fieldError
					: fieldType === "category" || fieldType === "author"
					? "Separate each " + fieldType + " with ;"
					: " "
			}
		/>
	);
}
