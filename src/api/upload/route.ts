import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import multer from 'multer'
import path from 'path'
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express'

export const config = {
  api: { bodyParser: false },
}

interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File
}

type CustomReq = ExpressRequest & NextApiRequestWithFile
type CustomRes = ExpressResponse & NextApiResponse

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.join(process.cwd(), 'public', 'uploads'))
    },
    filename: (_req, file, cb) => {
      const timestamp = Date.now()
      const safeName = file.originalname.replace(/\s+/g, '_')
      cb(null, `${timestamp}_${safeName}`)
    },
  }),
})

const router = createRouter<CustomReq, CustomRes>()

router.use((req: CustomReq, res: CustomRes, next: NextFunction) => {
  upload.single('file')(req, res, (err?: unknown) => {
    if (err) next(err)
    else next()
  })
})

router.post((req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  const url = `/uploads/${path.basename(req.file.path)}`
  return res.status(200).json({ url })
})

export default router.handler({
  onError(error, _req, res) {
    const message = error instanceof Error ? error.message : String(error)
    res.status(500).json({ error: message })
  },
  onNoMatch(_req, res) {
    res.status(405).json({ error: 'Method not allowed' })
  },
})
