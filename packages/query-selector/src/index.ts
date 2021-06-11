import graphql from "graphql-anywhere"
import { Resolver } from "graphql-anywhere"
import { invalidFieldNameError, noSelectorArgError } from "./errors"

type ElementNodeList = NodeListOf<Element>

const getElement = (fieldName: Parameters<Resolver>[0], element: Element, selector: string) => {
  if (fieldName === 'one') return element.querySelector(selector)
  else if (fieldName === 'all') return element.querySelectorAll(selector)

  else throw invalidFieldNameError
}

const resolver: Resolver = (fieldName, root: Element | ElementNodeList, { s }: { s?: string }) => {
  if (!s) throw noSelectorArgError

  if (root instanceof NodeList) {
    const list: (Element | ElementNodeList | null)[] = []
    root.forEach((node) => {
      list.push(getElement(fieldName, node, s))
    })
    return list
  }
  else return getElement(fieldName, root, s)
}

const querySelector = (query: any, root: HTMLElement) =>
  graphql(resolver, query, root)

export default querySelector
