const router = express.Router();
const fieldServiceController = require('../controllers/fieldService/fieldService.controller')
router.get("/complaintAccept", fieldServiceController.complaintAccept);

module.exports = router;