import { Router } from "express"

import {
  shorten,
  getLinkInfos,
  openLink,
  deleteLink,
} from "../controllers/urlController.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import { validateURL } from "../middlewares/urlMiddleware.js"

const urlRouter = Router()

urlRouter.post("/urls/shorten", validateToken, validateURL, shorten)
urlRouter.get("/urls/:id", getLinkInfos)
urlRouter.get("/urls/open/:shortUrl", openLink)
urlRouter.delete("/urls/:id", validateToken, deleteLink)

export default urlRouter
