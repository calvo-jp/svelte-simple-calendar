type Classname = string | undefined | null;

export function cn(...classes: Classname[]) {
  return classes.filter(Boolean).join(' ').replace(/\s+/g, ' ');
}
