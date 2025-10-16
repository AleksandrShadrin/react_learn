import { useState, type ReactElement } from "react";
import "./counter.css";

export function Counter(): ReactElement {
	const [count, setCount] = useState(0);

	return (
		<div className="card">
			<div
				style={{
					margin: "auto",
				}}
			>
				{count}
			</div>
			<div>
				<button onClick={() => setCount((x) => x + 1)}>+</button>
				<button onClick={() => setCount((x) => x - 1)}>-</button>
			</div>
		</div>
	);
}
