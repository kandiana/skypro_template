import templateEngine from "~/lib/template";

import '~/css/example.css'

function printClick(): void {
  console.log('click')
}

function printElementTextContent(event: Event): void {
  const target = event.target as HTMLElement;
  console.log(target.textContent)
}

const exampleTemplate = {
  tag: 'div',
  cls: 'container',
  content: [
    {
      tag: 'button',
      cls: 'button',
      listeners: {
        'click': printClick
      },
      content: 'Click'
    },
    {
      tag: 'button',
      cls: ['button', 'button_yellow'],
      listeners: {
        'click': printClick
      },
      content: 'Click'
    },
    {
      tag: 'div',
      cls: 'wrapper',
      content: [
        {
          tag: 'button',
          cls: ['button', 'button_blue'],
          listeners: {
            'click': printElementTextContent
          },
          content: 'Blue button'
        },
        {
          tag: 'button',
          cls: ['button', 'button_red'],
          listeners: {
            'click': printElementTextContent
          },
          content: 'Red button'
        }
      ]
    },
    {
      tag: 'button',
      cls: ['button'],
      listeners: {
        'click': printElementTextContent
      },
      content: 'Button with a very long name'
    },
  ]
}

export default function Example(container: HTMLElement) {
  const element = templateEngine(exampleTemplate);
  container.appendChild(element)
}
