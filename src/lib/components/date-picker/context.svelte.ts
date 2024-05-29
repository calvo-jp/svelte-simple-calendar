import {
  createPopper,
  type CreatePopperProps,
} from '$lib/utils/create-popper/create-popper.svelte.js';
import {getContext, setContext} from 'svelte';

export interface CreateDatePickerContextProps extends CreatePopperProps {
  value?: Date | null;
  onValueChange?: ((value: Date | null) => void) | null;
}

export type CreateDatePickerContextReturn = ReturnType<typeof createDatePickerContext>;

export function createDatePickerContext(props?: CreateDatePickerContextProps) {
  const popper = createPopper(props);

  let value = $state(props?.value ?? null);

  function onValueChange(newValue: Date | null) {
    value = newValue;
    props?.onValueChange?.(newValue);
  }

  return {
    get value() {
      return value;
    },
    onValueChange,
    get isOpen() {
      return popper.open;
    },
    open() {
      popper.setOpen(true);
    },
    close() {
      popper.setOpen(false);
    },
    get reference() {
      return popper.reference;
    },
    get floating() {
      return popper.floating;
    },
    get arrow() {
      return popper.arrow;
    },
  };
}

export function setDatePickerContext(context: CreateDatePickerContextReturn) {
  setContext('date-picker', context);
}

export function getDatePickerContext() {
  return getContext<CreateDatePickerContextReturn>('date-picker');
}
