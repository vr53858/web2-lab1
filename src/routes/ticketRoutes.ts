import express from 'express';
import { createTicketController, getTicket, getTickets, getTicketsCount } from '../controllers/ticketController';

const router = express.Router();

router.get('/tickets-count', getTicketsCount);
router.get('/:id', getTicket);
router.get('/', getTickets);
router.post('/', createTicketController);

export default router;