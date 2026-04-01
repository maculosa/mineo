export function getPinningClass(fixed?: 'left' | 'right' | false) {
  if (fixed === 'left') {
    return 'sticky left-0 z-10 bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]';
  }

  if (fixed === 'right') {
    return 'sticky right-0 z-10 bg-background shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]';
  }
  return '';
}
