import {
  type ChangeEvent,
  type ReactElement,
  useEffect,
  useState,
} from 'react';

export function Header(): ReactElement {
  const [header, setHeader] = useState('');

  useEffect(() => {
    document.title = header;
  }, [header]);

  const f = (e: ChangeEvent<HTMLInputElement>) =>
    setHeader(e.currentTarget.value);

  return <input type='text' onChange={f} />;
}
