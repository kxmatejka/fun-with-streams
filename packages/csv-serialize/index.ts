import stream = require('stream')

interface Config {
  separator?: string
}

class CsvSerialize extends stream.Transform {
  private readonly separator: string
  private isHeaderWritten = false

  constructor({separator}: Config = {}) {
    super({
      objectMode: true
    })

    this.separator = separator
  }

  _transform(chunk: any, encoding: string, callback: (error?: (Error | null), data?: any) => void): void {
    if (!this.isHeaderWritten) {
      this.push(Object.keys(chunk).join(this.separator) + '\n')
      this.isHeaderWritten = true
    }
    this.push(Object.values(chunk).join(this.separator) + '\n')

    callback()
  }
}

export {
  CsvSerialize
}
