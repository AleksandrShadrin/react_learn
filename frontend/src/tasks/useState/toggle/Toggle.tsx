import { type ReactElement } from "react";

export function Toggle(props: { enabled: boolean, onChange?: (value: boolean) => void }): ReactElement {
	return (
		<>
			<input
				type="checkbox"
				onChange={(e) => {
					if (props.onChange)
						props.onChange(e.currentTarget.checked);
				}}
				defaultChecked={props.enabled}
			/>
		</>
	);
}
