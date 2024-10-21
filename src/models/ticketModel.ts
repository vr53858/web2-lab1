import { query } from '../db/data';
import { Ticket } from '../types/Ticket';

export const getAllTickets = async (): Promise<Ticket[]> => {
  const result = await query('SELECT * FROM tickets');
  return result.rows;
};

export const getTicketsCnt = async (): Promise<number> => {
  const result = await query('SELECT COUNT(*) FROM tickets');
  return result.rows[0];
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
  const result = await query('SELECT * FROM tickets WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
  const result = await query(
    'INSERT INTO tickets (vatin, first_name, last_name, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [ticket.vatin, ticket.firstName, ticket.lastName, new Date()]
  );
  return result.rows[0];
};

export const checkTicketVatinLimit = async (vatin: number): Promise<boolean> => {
  const result = await query(
    'SELECT COUNT(*) FROM tickets WHERE vatin = $1',
    [vatin]
  );
  return Number(result.rows[0].count) < 3;
};

