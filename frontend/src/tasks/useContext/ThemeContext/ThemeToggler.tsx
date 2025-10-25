import { type ReactElement, useContext } from 'react';

import { Toggle } from '../../useState/toggle/Toggle';
import { ThemeContext } from './ThemeContext';

export default function ThemeToggler(): ReactElement {
  const themeContext = useContext(ThemeContext);

  return <Toggle enabled={true} onChange={themeContext.toggleTheme} />;
}
