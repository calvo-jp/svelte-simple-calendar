export function portal(node: HTMLElement) {
  function update() {
    document.body.appendChild(node);
    node.removeAttribute('hidden');
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
