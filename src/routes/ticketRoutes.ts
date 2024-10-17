import express from 'express';
import { createTicketController, getTicket, getTickets } from '../controllers/ticketController';

const router = express.Router();

router.get('/', getTickets);
router.post('/', createTicketController);

export default router;