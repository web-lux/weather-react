import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./normalize.css";
import "./index.scss";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
		<Toaster />
	</React.StrictMode>
);
