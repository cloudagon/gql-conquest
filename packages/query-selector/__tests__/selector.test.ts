import gql from 'graphql-tag'
import querySelector from 'src'
import { invalidFieldNameError, noSelectorArgError } from 'src/errors'

const rootDiv = document.createElement('div')

const p1 = document.createElement('p')
p1.textContent = 'Hello World'

const p2 = document.createElement('p')
p2.id = 'p2'

const section = document.createElement('section')
const sectionId = 'section1'
section.id = sectionId

rootDiv.append(p1, p2, section)

const h1WithClassName = document.createElement('h1')
h1WithClassName.classList.add('heading')

const h1Span = document.createElement('span')
h1Span.id = 'title'
h1Span.textContent = 'gql-conquest'
h1WithClassName.append(h1Span)

const h2WithClassName = document.createElement('h2')
h2WithClassName.textContent = 'query-selector'
h2WithClassName.classList.add('heading')

const h2Span = document.createElement('span')
h2Span.textContent = 'heading2'

const h2Italic = document.createElement('i')
h2Italic.textContent = 'italicized'
h2WithClassName.append(h2Span, h2Italic)

const sectionSpan = document.createElement('span')
sectionSpan.textContent = 'this is a section'

section.append(h1WithClassName, h2WithClassName, sectionSpan)

describe('div top level', () => {
  const query = querySelector(
    gql`
    {
      p: all(s: "p")
      section: one(s: "#${sectionId}")
    }`,
    rootDiv,
  )

  it('has two ps', () => {
    const rootDivPs = rootDiv.querySelectorAll('p')
    expect(query.p).toStrictEqual(rootDivPs)
  })

  it('has a section', () => {
    expect(query.section).toBe(section)
  })
})

const headingsQuerySelector = 'h1, h2, h3, h4, h5, h6'

describe('(nested) div section', () => {
  it('has h1s', () => {
    const query = querySelector(
      gql`
    {
      section: one(s: "section") {
        headings: all(s: "${headingsQuerySelector}")
      }
    }`,
      rootDiv,
    )

    const headings = section.querySelectorAll(headingsQuerySelector)
    expect(query.section.headings).toStrictEqual(headings)
  })

  it('has h1 spans and italics', () => {
    const query = querySelector(
      gql`
    {
      section: one(s: "section") {
        headings: all(s: "${headingsQuerySelector}") {
          spans: one(s: "span")
          italics: one(s: "i")
        }
        spans: all(s: "span")
      }
    }`,
      rootDiv,
    )

    expect(query.section.headings.spans).toStrictEqual([h1Span, h2Span])
    expect(query.section.spans[2]).toBe(sectionSpan)
    expect(query.section.headings.italics).toStrictEqual([null, h2Italic])
  })
})

describe('errors', () => {
  test('on invalid field', () => {
    expect(() =>
      querySelector(
        gql`
          {
            section: invalid(s: "a")
          }
        `,
        rootDiv,
      ),
    ).toThrow(invalidFieldNameError)
  })

  test('when no selector arg is passed', () => {
    expect(() =>
      querySelector(
        gql`
          {
            section: one(q: "section")
          }
        `,
        rootDiv,
      ),
    ).toThrow(noSelectorArgError)
  })
})
