import showdown from 'showdown'

// biome-ignore lint/complexity/noStaticOnlyClass: Requires private static fields
class Markdown {
  static #converter

  static render(text = '') {
    return Markdown.#converter.makeHtml(text)
  }

  static {
    const converter = new showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
      sanitize: true,
      openLinksInNewWindow: true,
    })

    Markdown.#converter = converter
  }
}

export default Markdown
