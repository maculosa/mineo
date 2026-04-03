export function getPinningClass(fixed?: 'left' | 'right' | false) {
  if (fixed === 'left') {
    return 'sticky left-0 top-0 z-10 bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-all duration-200';
  }

  if (fixed === 'right') {
    return 'sticky right-0 top-0 z-10 bg-background row-group[data-[state=selected]]:bg-muted shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-all duration-200';
  }
  return '';
}
