import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddBookPage from "./pages/AddBookPage";
import BookPage from "./pages/BookPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";

const theme = createTheme({
	palette: {
		primary: {
			main: "#333333",
		},
		secondary: {
			main: "#C95752",
		},
	},
	typography: {
		fontFamily: ["Montserrat", "sans-serif"].join(","),
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<SearchPage />} />
					<Route path="/book/:isbn" element={<BookPage />} />
					<Route path="/add" element={<AddBookPage />} />
				</Routes>
				<Footer />
			</Router>
		</ThemeProvider>
	);
}

export default App;
