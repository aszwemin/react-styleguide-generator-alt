// component-requires.js is a generated file in rsg.js that contains
// the list of required user-defined components
import Components from '../../rsg-tmp/component-requires'

// for `commonStrict` module formatter
// https://babeljs.io/docs/usage/modules/#interop
let Contents = Components
  .map((Content) => Content.default || Content)
  .filter((Component) => Component.styleguide)
// compare index numbers
  .sort((a, b) => {
    var ai = a.styleguide.index
    var bi = b.styleguide.index

    if (!isNaN(parseFloat(ai)) && !isNaN(parseFloat(bi))) {
      return parseFloat(ai) - parseFloat(bi)
    } else {
      return !ai && !bi ? 0 : !ai ? 1 : !bi ? -1 : ai.toString().localeCompare(bi)
    }
  })

export default {
  /**
   * @type {string[]}
   */
  navList: (() => {
    const components = {}

    const categories = Contents
      .map((Content) => {
        const styleguide = Content.styleguide

        components[styleguide.category] = components[styleguide.category] ? components[styleguide.category] : []
        components[styleguide.category].push(styleguide.title)

        return Content.styleguide.category
      })
      .filter((category, i, categories) => categories.indexOf(category) === i)

    return {
      categories: categories,
      components: components
    }
  })(),

  /**
   * @param {Object=} data
   * @param {string=} data.query
   * @param {string[]=} data.keys
   * @param {boolean=} data.exact
   * @returns {ReactClass[]}
   */
  search (data) {
    data = data || {}

    let query = (data.query || '').trim().toLowerCase()
    let keys = data.keys || []
    let exact = !!data.exact
    let phrases = !exact ? query.split(' ') : null

    if (query === '') {
      return Contents
    }

    return Contents.filter((Content) => {
      return keys
        .filter((key) => !!Content.styleguide[key])
        .some((key) => {
          let val = Content.styleguide[key].toLowerCase()

          return exact ? val === query : phrases.every((phrase) => val.indexOf(phrase) !== -1)
        })
    })
  }
}
