import Router from "./routers/index";
import { ErrorBoundary } from "./components/common/ErrorBoundry/ErrorBoundry";
import { useEffect, useState } from "react";

interface Props {
	name?: string;
}

const App: React.FC<Props> = () => {
	const [state] = useState(1);

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<div className="App">
			<ErrorBoundary
				FallbackComponent={(error) => {
					return <span>{error?.error?.message}</span>;
				}}
				onError={(error) => {
					console.log(
						JSON.stringify({
							stack: error?.stack || "",
							message: error?.message || "",
						}),
					);
				}}
			>
				<Router />
			</ErrorBoundary>
		</div>
	);
};

export default App;
