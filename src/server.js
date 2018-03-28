// require('babel/register')

var express = require('express')
  , app = express()
  , React = require('react')
  , ReactDOM = require('react-dom/server')
  , components = require('./header.js')

var  Header = React.createFactory(components.Header)
app.use(express.static(`${__dirname}/src`))

app.get('/', (req, res) => {
  res.render('browser', {
    react: ReactDOM.renderToString(Header())
  })
})

app.listen(4000, () => {
  console.log('Listening on port 3000...')
})
