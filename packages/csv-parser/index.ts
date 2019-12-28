import stream = require('stream')

interface Config {
  separator? :string
}

class CsvParser extends stream.Transform {
  private readonly separator: string
  private header = []

  constructor({separator = ','}: Config = {}) {
    super({
      objectMode: true
    })

    this.separator = separator
  }

  _transform(chunk: any, encoding: string, callback: (error?: (Error | null), data?: any) => void): void {
    const parsedChunk = chunk.toString().split(this.separator)

    if (!this.header.length) {
      this.header = parsedChunk
    } else {
      const serializedValue = this.header.reduce(((previousValue, currentValue, index) => {
        return {
          ...previousValue,
          [currentValue]: parsedChunk[index]
        }
      }), {})
      this.push(serializedValue)
    }

    callback()
  }
}

export {
  CsvParser
}
