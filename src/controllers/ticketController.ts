import { Request, Response, NextFunction } from "express";
import {
  checkTicketVatinLimit,
  createTicket,
  getAllTickets,
  getTicketById,
  getTicketsCnt,
} from "../models/ticketModel";
import QRCode from 'qrcode';

export const getTicketsCount = async (req: Request, res: Response) => {
  try {
    const ticketsCount = await getTicketsCnt();
    res.status(200).json(ticketsCount);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets count" });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ticket" });
  }
};

export const createTicketController = async (req: Request, res: Response) => {
  try {
    const { vatin, firstName, lastName } = req.body;

    if (!vatin || !firstName || !lastName) {
      res.status(400).json({
        message: "Missing required fields: vatin, firstName, and/or lastName",
      });
      return;
    }

    const isVatinWithinLimits = await checkTicketVatinLimit(vatin);

    if(!isVatinWithinLimits){
      res.status(400).json({
        message: "Can't have more than 3 tickets with the same OIB!",
      });
      return;
    }

    const newTicket = await createTicket(req.body);
    const ticketUrl = `${process.env.TICKET_WEB_URL}/${newTicket.id}`;

    // QRCode.toDataURL(ticketUrl, (err, qrCode) => {
    //   if (err) {
    //     console.error("Error generating QR code:", err);
    //     res.status(500).json({ message: "Error generating QR code" });
    //     return;
    //   }

    //   res.status(201).json({
    //     message: "Ticket created successfully",
    //     qrCode, // Return the QR code image data (base64-encoded string)
    //   });
    // });
    QRCode.toBuffer(ticketUrl, { type: 'png' }, (err, qrCodeBuffer) => {
      if (err) {
        console.error("Error generating QR code:", err);
        res.status(500).json({ message: "Error generating QR code" });
        return;
      }

      res.setHeader('Content-Type', 'image/png');

      res.status(201).send(qrCodeBuffer);
    });
  } catch (error) {
    console.error("Error occurred:", (error as Error).message);
    res.status(500).json({ message: "Error creating ticket" });
  }
};
