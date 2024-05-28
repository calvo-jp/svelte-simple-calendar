import type {CreatePopperProps} from '$lib/utils/create-popper/create-popper.svelte.js';

export interface CreateDatePickerContextProps extends CreatePopperProps {
  value?: Date | null;
  onValueChange?: ((value: Date) => void) | null;
}

export type CreateDatePickerContextReturn = ReturnType<typeof createDatePickerContext>;

export function createDatePickerContext(props?: CreateDatePickerContextProps) {
  return {};
}
