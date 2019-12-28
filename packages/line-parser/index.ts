import stream = require('stream')

class LineParser extends stream.Transform {
  _transform(chunk: any, encoding: string, callback: (error?: (Error | null), data?: any) => void): void {
    chunk.toString().split('\n').forEach((line) => this.push(line))
    callback()
  }
}

export {
  LineParser
}
