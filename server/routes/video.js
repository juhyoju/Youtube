const express = require('express')
const router = express.Router()
const { Video } = require('../models/Video')

const { auth } = require('../middleware/auth')
const multer = require('multer')

// Storage multer config

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 어디에 저장을 할지
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // 파일명을 뭐로 저장할 것인지
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false)
    }
    cb(null, true)
  }
})

const upload = multer({ storage: storage }).single('file')

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
  // 클라이언트로부터 받은 비디오를 서버에 저장한다.

  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename
    })
  })
})

module.exports = router
