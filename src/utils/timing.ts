export function debounce<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: TArgs) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delayMs);
  };
}

export function throttle<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
) {
  let lastRun = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let trailingArgs: TArgs | undefined;

  return (...args: TArgs) => {
    const now = Date.now();
    const remainingMs = delayMs - (now - lastRun);

    if (remainingMs <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }

      lastRun = now;
      callback(...args);
      return;
    }

    trailingArgs = args;

    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        lastRun = Date.now();

        if (trailingArgs) {
          callback(...trailingArgs);
          trailingArgs = undefined;
        }
      }, remainingMs);
    }
  };
}
