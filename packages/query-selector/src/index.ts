import graphql, { Resolver } from 'graphql-anywhere'
import { invalidFieldNameError, noSelectorArgError } from './errors'

type ElementNodeList = NodeListOf<Element>

const getElement = (
  fieldName: Parameters<Resolver>[0],
  element: Element,
  selector: string,
) => {
  if (fieldName === 'one') return element.querySelector(selector)
  if (fieldName === 'all') return element.querySelectorAll(selector)

  throw invalidFieldNameError
}

const resolver: Resolver = (
  fieldName,
  root: Element | ElementNodeList,
  { s }: { s?: string },
) => {
  if (!s) throw noSelectorArgError

  if (Object.prototype.isPrototypeOf.call(NodeList.prototype, root)) {
    const rootNodeList = root as ElementNodeList

    const list: Array<Element | ElementNodeList | null> = []
    rootNodeList.forEach((node) => {
      list.push(getElement(fieldName, node, s))
    })
    return list
  }
  const rootElement = root as Element
  return getElement(fieldName, rootElement, s)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const querySelector = (query: any, root: HTMLElement) =>
  graphql(resolver, query, root)

export default querySelector
