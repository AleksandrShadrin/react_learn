import { useFontSizeContext } from './FontSizeContext';

export default function Text(props: { text: string }) {
    const fontSizeContext = useFontSizeContext();

    return (
        <div style={{ fontSize: fontSizeContext.fontSize }}>{props.text}</div>
    );
}
