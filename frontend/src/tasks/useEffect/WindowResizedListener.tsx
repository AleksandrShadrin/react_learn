import { type ReactElement, useEffect, useState } from 'react';

export default function WindowResizedListener(): ReactElement {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onWindowResized = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    addEventListener('resize', onWindowResized);

    return () => removeEventListener('resize', onWindowResized);
  }, []);

  return (
    <>
      <div>width: {windowSize.width}</div>
      <div>height:{windowSize.height}</div>
    </>
  );
}
