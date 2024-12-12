const router = express.Router();
const fieldServiceController = require('../controllers/fieldService/')
router.get("/complaintAccept", fieldServiceController.complaintAccept);

module.exports = router;