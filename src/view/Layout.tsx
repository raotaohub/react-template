import type React from "react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";

interface Props {
	name?: string;
}

const Layout: React.FC<Props> = (props) => {
	const navigate = useNavigate();
	const searchParams = useSearchParams();

	useEffect(() => {
		console.warn("useSearchParams", searchParams);
		console.warn("useNavigate", navigate);
	}, []);

	return (
		<div>
			<nav
				style={{
					paddingBottom: "1rem",
				}}
			>
				<h1>Hello my name is {props?.name}</h1>
				<Link to="/layout/home">home</Link> | <Link to="/layout/about">about</Link> |{" "}
				<Link to="/layout/expenses">expenses</Link>| <Link to="/layout/invoices">invoices</Link>
			</nav>

			<main
				style={{
					border: "1px solid black",
					padding: "1rem",
					minHeight: "60vh",
				}}
			>
				<Outlet />
			</main>
		</div>
	);
};

Layout.displayName = "__Layout__";
export default Layout;
