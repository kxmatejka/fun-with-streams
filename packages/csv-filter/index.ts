import stream = require('stream')

interface Config {
  searchValue: string|RegExp,
  searchAttribute: string
}

class CsvFilter extends stream.Transform {
  private readonly searchValue
  private readonly searchAttribute

  constructor({searchAttribute, searchValue}: Config) {
    super({
      objectMode: true
    })

    this.searchValue = searchValue
    this.searchAttribute = searchAttribute
  }

  _transform(chunk: any, encoding: string, callback: (error?: (Error | null), data?: any) => void): void {
    if (chunk[this.searchAttribute].search(this.searchValue) > -1) {
      this.push(chunk)
    }
    callback()
  }
}

export {
  CsvFilter
}
