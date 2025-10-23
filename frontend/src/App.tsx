import FontSizeContextProvider from "./tasks/useContext/FontSizeContext/FontSizeContextProvider";
import Text from "./tasks/useContext/FontSizeContext/Text";
import Settings from "./tasks/useContext/Settings";
import ThemeContextProvider from "./tasks/useContext/ThemeContext/ThemeContextProvider";
import Fetch from "./tasks/useEffect/Fetch";
import ComponentMounted from "./tasks/useEffect/MountedComponent";
import WindowResizedListener from "./tasks/useEffect/WindowResizedListener";
import Parent from "./tasks/useMemo/Parent";
import Counter from "./tasks/useReducer/Counter";
import Form from "./tasks/useReducer/Form/Form";
import TodoList from "./tasks/useReducer/TodoList/TodoList";
import Input from "./tasks/useRef/Input";
import StopWatch from "./tasks/useRef/StopWatch";
import ColorPicker from "./tasks/useState/colorPicker/ColorPicker";
import { Header } from "./tasks/useState/header/Header";
import { Toggle } from "./tasks/useState/toggle/Toggle";

function App() {

	return (
		<ThemeContextProvider theme="light" >
			<FontSizeContextProvider>
				<div>
					<Settings />
					<Text text="text1" />
					<Text text="text2" />
					<Counter />
					<Toggle enabled={true} />
					<Header />
					<ColorPicker r={0} g={0} b={0} />
					<ComponentMounted />
					<Fetch />
					<WindowResizedListener />
					<TodoList />
					<Form />
					<Parent />
					<Input focus={true} />
					<StopWatch />
				</div>
			</FontSizeContextProvider>
		</ThemeContextProvider>
	);
}

export default App;
