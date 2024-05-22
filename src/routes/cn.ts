type Classname = string | boolean | undefined | null;

export function cn(...classes: Classname[]) {
  return classes.filter(Boolean).join(' ').replace(/\s+/g, ' ');
}
