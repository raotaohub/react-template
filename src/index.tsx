import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import EasyModal from "ez-modal-react";

import App from "./App";
import "./styles.css";
import "./styles.less";

const mountNode = document.getElementById("app");

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(mountNode!).render(
	<EasyModal.Provider>
		<HashRouter>
			<App name="Jane" />
		</HashRouter>
	</EasyModal.Provider>,
);
