import { Autocomplete, Checkbox, TextField, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export default function Filter({
	filterLabel,
	filterKey,
	allFiltersItems,
	selectedFiltersItems,
	setSelectedFiltersItems,
}) {
	return (
		<div style={{ position: "relative", zIndex: 1 }}>
			<Autocomplete
				multiple
				id={filterLabel + "-filter"}
				options={allFiltersItems}
				disableCloseOnSelect
				getOptionLabel={(option) => option.toString()}
				value={selectedFiltersItems}
				onChange={(e, newValue) =>
					setSelectedFiltersItems((prev) => ({
						...prev,
						[filterKey]: newValue,
					}))
				}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							style={{ marginRight: 8 }}
							checked={selected}
						/>
						{option}
					</li>
				)}
				renderInput={(params) => (
					<TextField {...params} label={filterLabel} size="small" />
				)}
				renderTags={(value, getTagProps) => {
					const numTags = value.length;

					return (
						<Typography variant="body2" style={{ paddingLeft: 10 }}>
							{value
								.slice(0, 1)
								.map((option, _) => option)
								.join(", ")}

							{numTags > 1 && ` +${numTags - 1}`}
						</Typography>
					);
				}}
			/>
		</div>
	);
}
