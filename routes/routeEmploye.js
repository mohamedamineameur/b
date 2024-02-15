import { Router } from "express";
import {
    lister_employes,
    ajouter_employe,
    modifier_employe,
    recuperer_employe,
    supprimer_employe,
    modifierPartiellementEmploye
} from "../controllers/Employe.js";
import { isAdmin, verifierToken } from "../authentification/autorisation.js";

const routeEmployes = Router();

routeEmployes.get('/',verifierToken, isAdmin, lister_employes)
    .post('/',/*verifierToken,isAdmin,*/  ajouter_employe)
    .get('/:id',verifierToken,isAdmin,  recuperer_employe)
    .put('/:id',verifierToken,isAdmin,  modifier_employe)
    .delete('/:id',verifierToken,isAdmin,  supprimer_employe)
    .patch('/:id',verifierToken,isAdmin,modifierPartiellementEmploye)
export default routeEmployes;
