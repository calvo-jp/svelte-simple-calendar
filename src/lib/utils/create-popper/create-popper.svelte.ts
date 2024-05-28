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

export interface CreatePopperProps {
  /**
   * @default false
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * @default 'absolute'
   */
  strategy?: Strategy;
  /**
   * @default 'bottom'
   */
  placement?: Placement;
  /**
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * @default true
   */
  closeOnOutsideClick?: boolean;
  /**
   * @default 8
   */
  sideOffset?: number;
  /**
   * @default 8
   */
  alignOffset?: number;
}

export type CreatePopperReturn = ReturnType<typeof createPopper>;

export function createPopper(props?: CreatePopperProps) {
  let referenceEl: HTMLElement | null = $state(null);
  let floatingEl: HTMLElement | null = $state(null);
  let arrowEl: HTMLElement | null = $state(null);

  let open = $state(props?.open ?? false);

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
          offset(props?.sideOffset ?? 8),
          flip(),
          shift({padding: props?.alignOffset ?? 8}),
          ...(arrowEl ? [arrowMiddleware({element: arrowEl})] : []),
        ],
      }).then(({x, y, strategy, placement, middlewareData}) => {
        if (!floatingEl) return;
        if (!referenceEl) return;

        floatingEl.style.top = `${y}px`;
        floatingEl.style.left = `${x}px`;
        floatingEl.style.position = strategy;

        if (!arrowEl) return;

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
      });
    });

    return cleanup;
  });

  function reference(node: HTMLElement) {
    function handle() {
      open = !open;
    }

    function update() {
      referenceEl = node;
      node.addEventListener('click', handle);
    }

    function destroy() {
      referenceEl = null;
      node.removeEventListener('click', handle);
    }

    update();

    return {update, destroy};
  }

  function floating(node: HTMLElement) {
    function update() {
      floatingEl = node;
    }

    function destroy() {
      floatingEl = null;
    }

    update();

    return {update, destroy};
  }

  function arrow(node: HTMLElement) {
    function update() {
      arrowEl = node;
    }

    function destroy() {
      arrowEl = null;
    }

    update();

    return {update, destroy};
  }

  return {
    get open() {
      return open;
    },
    set open(value: boolean) {
      open = value;
    },
    /**
     * @example
     * ```svelte
     *  <button use:reference>Click</button>
     * ```
     */
    reference,
    /**
     * @example
     * ```svelte
     *  <div use:floating>
     *    ...
     *  </div>
     * ```
     */
    floating,
    /**
     * @example
     * ```svelte
     *  <div use:floating>
     *    <div use:arrow style="--arrow-size: 24px;"></div>
     *  </div>
     * ```
     */
    arrow,
  };
}
