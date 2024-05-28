export function portal(node: HTMLElement) {
  function update() {
    document.body.appendChild(node);
  }

  function destroy() {
    document.body.removeChild(node);
  }

  update();

  return {
    update,
    destroy,
  };
}
