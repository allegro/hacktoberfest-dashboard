import { useState, useLayoutEffect } from 'react';

// calculate initial value before React lifecycle kicks in
const isOSDarkOnInit = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const usePreferredColorScheme = (): 'dark' | 'light' => {
  const [isOSDark, setIsOSDark] = useState(isOSDarkOnInit);

  const onOSDarkModeChange = (event: MediaQueryListEvent): void => {
    setIsOSDark(event.matches);
  };

  useLayoutEffect(() => {
    const matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (matchMediaDark.addEventListener) {
      matchMediaDark.addEventListener('change', onOSDarkModeChange);
    } else {
      // to support Safari < 14
      matchMediaDark.addListener(onOSDarkModeChange);
    }

    setIsOSDark(matchMediaDark.matches);

    return (): void => {
      if (matchMediaDark.removeEventListener) {
        matchMediaDark.removeEventListener('change', onOSDarkModeChange);
      } else {
        // to support Safari < 14
        matchMediaDark.removeListener(onOSDarkModeChange);
      }
    };
  }, [isOSDark]);

  return isOSDark ? 'dark' : 'light';
};
