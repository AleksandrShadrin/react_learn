import { type ChangeEvent, type ReactElement, useState } from 'react';

type ColorPickerState = {
  r: number;
  g: number;
  b: number;
};

export default function ColorPicker(props: ColorPickerState): ReactElement {
  const [colorPicker, setColorPicker] = useState(props);

  return (
    <div>
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: `rgb(${colorPicker.r}, ${colorPicker.g}, ${colorPicker.b})`,
        }}
      />
      <input
        value={colorPicker.r}
        min={0}
        max={255}
        type='range'
        onChange={onChangeFactory(value =>
          setColorPicker(p => ({ ...p, r: value }))
        )}
      />
      <input
        value={colorPicker.g}
        min={0}
        max={255}
        type='range'
        onChange={onChangeFactory(value =>
          setColorPicker(p => ({ ...p, g: value }))
        )}
      />
      <input
        value={colorPicker.b}
        min={0}
        max={255}
        type='range'
        onChange={onChangeFactory(value =>
          setColorPicker(p => ({ ...p, b: value }))
        )}
      />
    </div>
  );
}

function onChangeFactory(
  setter: (value: number) => void
): (e: ChangeEvent<HTMLInputElement>) => void {
  return e => {
    const value = Number.parseInt(e.currentTarget.value);
    setter(value);
  };
}
