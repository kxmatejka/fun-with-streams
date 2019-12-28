import fs = require('fs')
import {LineParser} from '../../packages/line-parser'
import {CsvParser} from '../../packages/csv-parser'
import {CsvFilter} from '../../packages/csv-filter'
import {CsvSerialize} from '../../packages/csv-serialize'

(function main() {
  const lineParser = new LineParser()
  const csvParser = new CsvParser()
  const csvFilter = new CsvFilter({
    searchValue: /.+\@.+\..+/,
    searchAttribute: 'LOGIN'
  })
  const csvSerialize = new CsvSerialize()

  fs.createReadStream(`${__dirname}/input.csv`)
    .pipe(lineParser)
    .pipe(csvParser)
    .pipe(csvFilter)
    .on('data', (chunk) => console.log(chunk))
    .pipe(csvSerialize)
    .pipe(fs.createWriteStream(`${__dirname}/output.csv`))
    .on('end', () => console.log('Done.'))
})()
