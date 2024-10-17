import { query } from '../db/data';
import { Ticket } from '../types/Ticket';
import camelcaseKeys from 'camelcase-keys';

export const getAllTickets = async (): Promise<Ticket[]> => {
  const result = await query('SELECT * FROM tickets');
  return camelcaseKeys(result.rows);
};

export const getTicketsCnt = async (): Promise<number> => {
  const result = await query('SELECT COUNT(*) FROM tickets');
  return result.rows[0];
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
  const result = await query('SELECT * FROM tickets WHERE id = $1', [id]);
  return camelcaseKeys(result.rows[0]) || null;
};

export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
  const result = await query(
    'INSERT INTO tickets (vatin, first_name, last_name, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [ticket.vatin, ticket.firstName, ticket.lastName, new Date()]
  );
  return camelcaseKeys(result.rows[0]);
};