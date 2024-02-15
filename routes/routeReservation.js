import { Router } from "express";
import {
    liste_reservations,
    ajout_reservation,
    modifier_reservation,
    reservationParId,
    supprimer_reservation,
    listereservationsParClientId
} from "../controllers/Reservation.js";
import { isAdmin, verifierToken, verifierTokenClient } from "../authentification/autorisation.js";

const routeReservations = Router();

routeReservations.get('/',verifierToken,isAdmin,  liste_reservations)
    .post('/',ajout_reservation)
    .get('/:id',  reservationParId)
    .put('/:id',  modifier_reservation)
    .delete('/:id',supprimer_reservation)
    .get('/liste/:id',verifierTokenClient, listereservationsParClientId);

export default routeReservations;
