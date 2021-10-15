type PrimitiveElement = string | number | boolean;

// to assign classes to the element
type Classes = string[] | string | null | undefined;

function addClasses(element: HTMLElement, classes: Classes): void {
  if (!classes) {
    return;
  }

  if (typeof classes === 'string') {
    element.classList.add(classes);
    return;
  }

  classes.forEach((className) => element.classList.add(className));
}

// to assign attributes to the element
type Attributes = {
  [key: string]: PrimitiveElement;
};

function addAttributes(element: HTMLElement, attributes: Attributes): void {
  if (!attributes) {
    return;
  }

  Object.keys(attributes).forEach((attributeName) => {
    element.setAttribute(attributeName, attributes[attributeName].toString());
  });
}

// to assign listeners to the element
type Listeners = {
  [key: string]: (event: Event) => void;
};

function addListeners(element: HTMLElement, listeners: Listeners): void {
  if (!listeners) {
    return;
  }

  Object.keys(listeners).forEach((action) => {
    element.addEventListener(action, listeners[action]);
  });
}

// main template function
export type TemplateElement = {
  tag: string;
  cls?: Classes;
  attrs?: Attributes;
  content?: TemplateElement[] | TemplateElement | PrimitiveElement | null | undefined;
  listeners?: Listeners;
};

type TemplateBlock = TemplateElement[] | TemplateElement | PrimitiveElement | null | undefined;

function isBlockPrimitiveElement(block: TemplateBlock): block is PrimitiveElement {
  return typeof block === 'string' || typeof block === 'number' || typeof block === 'boolean';
}

function templateEngine(block: TemplateBlock): HTMLElement | Text | DocumentFragment {
  if (!block) {
    return document.createTextNode('');
  }

  if (isBlockPrimitiveElement(block)) {
    return document.createTextNode(String(block));
  }

  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();

    block.forEach((contentItem) => {
      const el = templateEngine(contentItem);
      fragment.appendChild(el);
    });

    return fragment;
  }

  const element = document.createElement(block.tag);
  addClasses(element, block.cls);
  addAttributes(element, block.attrs);
  addListeners(element, block.listeners);
  element.appendChild(templateEngine(block.content));

  return element;
}

export default templateEngine;
