import express from 'express'
import { getReferrals } from '../controllers/referralController.js'

const router = express.Router()
router.get('/', getReferrals)

export default router