import {
  arrow as arrowMiddleware,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  type Placement,
  type Side,
  type Strategy,
} from '@floating-ui/dom';
import {dismiss, type DismissConfig} from './dismiss.js';

export interface CreatePopperConfig extends DismissConfig {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  strategy?: Strategy;
  placement?: Placement;
}

export function createPopper(props?: CreatePopperConfig) {
  let referenceEl: HTMLElement | null = $state(null);
  let floatingEl: HTMLElement | null = $state(null);
  let arrowEl: HTMLElement | null = $state(null);

  let open = $state(props?.open ?? false);

  $effect(() => {
    function handle(e: Event) {
      e.preventDefault();

      const nextOpen = !open;

      if (nextOpen) {
        floatingEl?.focus();
      } else {
        referenceEl?.focus();
      }

      props?.onOpenChange?.(nextOpen);
      open = nextOpen;
    }

    referenceEl?.addEventListener('click', handle);

    return () => {
      referenceEl?.removeEventListener('click', handle);
    };
  });

  $effect(() => {
    if (!floatingEl) return;
    if (!referenceEl) return;

    const cleanup = autoUpdate(referenceEl, floatingEl, () => {
      if (!floatingEl) return;
      if (!referenceEl) return;

      computePosition(referenceEl, floatingEl, {
        strategy: props?.strategy ?? 'absolute',
        placement: props?.placement ?? 'bottom',
        middleware: [
          offset(8),
          flip(),
          shift({padding: 8}),

          ...(arrowEl
            ? [
                arrowMiddleware({
                  element: arrowEl,
                }),
              ]
            : []),

          dismiss({
            closeOnEscape: props?.closeOnEscape,
            closeOnOutsideClick: props?.closeOnOutsideClick,
            onDismiss() {
              open = false;
            },
          }),
        ],
      }).then(({x, y, strategy, placement, middlewareData}) => {
        if (!floatingEl) return;
        if (!referenceEl) return;

        floatingEl.style.top = `${y}px`;
        floatingEl.style.left = `${x}px`;
        floatingEl.style.position = strategy;

        if (arrowEl) {
          const arrowY = middlewareData.arrow?.y;
          const arrowX = middlewareData.arrow?.x;

          const staticSide = {
            top: 'bottom' as Side,
            left: 'right' as Side,
            right: 'left' as Side,
            bottom: 'top' as Side,
          }[placement.split('-')[0] as Side];

          arrowEl.style.top = arrowY ? `${arrowY}px` : '';
          arrowEl.style.left = arrowX ? `${arrowX}px` : '';
          arrowEl.style.position = 'absolute';
          arrowEl.style.right = '';
          arrowEl.style.bottom = '';
          arrowEl.style.width = 'var(--arrow-size, 16px)';
          arrowEl.style.height = 'var(--arrow-size, 16px)';
          arrowEl.style[staticSide] = 'var(--arrow-size, -16px)';
        }
      });
    });

    return cleanup;
  });

  function reference(node: HTMLElement) {
    function update() {
      referenceEl = node;
    }

    update();

    return {
      update,
      destroy() {
        referenceEl = null;
      },
    };
  }

  function floating(node: HTMLElement) {
    function update() {
      floatingEl = node;
    }

    update();

    return {
      update,
      destroy() {
        floatingEl = null;
      },
    };
  }

  function arrow(node: HTMLElement) {
    function update() {
      arrowEl = node;
    }

    update();

    return {
      update,
      destroy() {
        arrowEl = null;
      },
    };
  }

  return {
    get open() {
      return open;
    },
    set open(value: boolean) {
      open = value;
    },
    get reference() {
      return reference;
    },
    get floating() {
      return floating;
    },
    get arrow() {
      return arrow;
    },
  };
}
