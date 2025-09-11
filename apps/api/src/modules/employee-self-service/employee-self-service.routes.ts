import { Router, type Request, type Response } from 'express';
import multer, { type FileFilterCallback } from 'multer';
import path from 'path';
import { authenticateToken } from '../../middleware/auth';
import { EmployeeSelfServiceController } from './employee-self-service.controller';

const router: ReturnType<typeof Router> = Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Employee Self Service module - API ready' });
});

// Multer storage
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadsDir = path.join(__dirname, '../../../uploads');
    cb(null, uploadsDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/plain'
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

router.get('/my-profile', authenticateToken, EmployeeSelfServiceController.getMyProfile);
router.put('/my-profile', authenticateToken, EmployeeSelfServiceController.updateMyProfile);
router.get('/my-documents', authenticateToken, EmployeeSelfServiceController.getMyDocuments);
router.post('/upload-document', authenticateToken, upload.single('file'), EmployeeSelfServiceController.uploadDocument);
router.delete('/documents/:id', authenticateToken, EmployeeSelfServiceController.deleteDocument);

export default router;

