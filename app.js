require("dotenv").config() // dotenv  모듈
const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const app = express()   // app 객체 만들기
const port = 3000
const globalRouter = require('./routes') // 기본적으로 Index 파일 찾음
// const connect = require('./schemas') // 기본으로 schemas의 index 파일 찾음
// connect()
// const errorHandler =require('./middleware/errorhandler')
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
// 라우터 미들웨어
app.use(globalRouter)
// app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
