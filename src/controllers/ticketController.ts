import { Request, Response, NextFunction } from 'express';
import { createTicket, getAllTickets, getTicketById, getTicketsCnt } from '../models/ticketModel';

export const getTicketsCount = async (req: Request, res: Response) => {
  try {
    const ticketsCount = await getTicketsCnt();
    res.status(200).json(ticketsCount);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets count' });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket' });
  }
};

export const createTicketController = async (req: Request, res: Response) => {
  try {
    const newTicket = await createTicket(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error occurred:', (error as Error).message);
    res.status(500).json({ message: 'Error creating ticket' });
  }
};