export default function appendChild(
  tagName: string,
  html: string,
  target: HTMLElement
): HTMLElement {
  const el = document.createElement(tagName) as HTMLElement;
  el.innerHTML = html;
  target.appendChild(el);

  return el;
}
