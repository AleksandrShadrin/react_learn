import FontSizeSwitcher from './FontSizeContext/FontSizeSwitcher';
import ThemeToggler from './ThemeContext/ThemeToggler';

export default function Settings() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
      }}
    >
      <ThemeToggler />
      <FontSizeSwitcher />
    </div>
  );
}
