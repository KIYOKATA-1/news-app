import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import multer from 'multer'
import path from 'path'

export const config = { api: { bodyParser: false } }

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
  }),
})

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use((req, res, next) => {
  const handler = upload.single('file')
  handler(req as any, res as any, (err: any) => {
    if (err) throw err     
    next()                
  })
})

router.post((req, res) => {
  const file = (req as any).file
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  const url = `/uploads/${path.basename(file.path)}`
  return res.status(200).json({ url })
})

export default router.handler({
  onError(error: any, _req, res) {
    res.status(500).json({ error: error.message ?? String(error) })
  },
  onNoMatch(_req, res) {
    res.status(405).json({ error: 'Method not allowed' })
  },
})
