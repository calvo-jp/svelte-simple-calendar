import {
  createPopper,
  type CreatePopperProps,
} from '$lib/utils/create-popper/create-popper.svelte.js';

export interface CreateDatePickerContextProps extends CreatePopperProps {
  value?: Date | null;
  onValueChange?: ((value: Date) => void) | null;
}

export type CreateDatePickerContextReturn = ReturnType<typeof createDatePickerContext>;

export function createDatePickerContext(props?: CreateDatePickerContextProps) {
  const popper = createPopper(props);

  let value = $derived(props?.value ?? null);

  function onValueChange(newValue: Date) {
    value = newValue;
    props?.onValueChange?.(newValue);
  }

  return {
    get popper() {
      return popper;
    },
    get value() {
      return value;
    },
    onValueChange,
  };
}
