import type {Middleware} from '@floating-ui/dom';

export interface DismissConfig {
  /**
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * @default true
   */
  closeOnOutsideClick?: boolean;
  onDismiss?: () => void;
}

const defaultConfig = {
  closeOnEscape: true,
  closeOnOutsideClick: true,
  onDismiss() {},
};

export function dismiss(config?: DismissConfig): Middleware {
  const {closeOnEscape, closeOnOutsideClick, onDismiss} = {
    ...defaultConfig,
    ...config,
  };

  return {
    name: 'dismiss',
    fn(context) {
      const reference = context.elements.reference as HTMLElement | null;
      const floating = context.elements.floating as HTMLElement | null;

      if (closeOnEscape) {
        // TODO
      }

      if (closeOnOutsideClick) {
        // TODO
      }

      return {};
    },
  };
}
