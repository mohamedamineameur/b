// Importation des modèles nécessaires
import {Employe} from "../models/relation.js"; 
import {Role} from "../models/relation.js"; 
import {SecurSalle} from "../models/relation.js"; 
import bcrypt from 'bcryptjs'
import ValidationUtilisateur from "../validation/ValidationEmploye.js";


// Lister tous les Employes avec leurs Rôles et SecurSalles
export const lister_employes = async (req, res) => {
    try {
        const employes = await Employe.findAll({
            
        });
        res.status(200).json(employes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un Employe
export const ajouter_employe = async (req, res) => {
    const { Nom, Prenom, Naissance, Telephone, Email, Mot_De_Passe, Photo, RoleId, SecurSalleId } = req.body;

    console.log(Nom)
    const errors=ValidationUtilisateur(req.body)
    if (errors !== true) {
        return res.status(400).json({ errors });  
    }
   
    try {
        
        
        const mdpCrypte=bcrypt.hashSync(Mot_De_Passe,10)
        const nouvelEmploye = await Employe.create({ 
            Nom, 
            Prenom, 
            Naissance, 
            Telephone, 
            Email, 
            Mot_De_Passe:mdpCrypte, 
            Photo, 
            RoleId, 
            SecurSalleId 
        });
        res.status(201).json(nouvelEmploye);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un Employe
export const modifier_employe = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nom, Prenom, Naissance, Telephone, Email, Mot_De_Passe, Photo, RoleId, SecurSalleId } = req.body;
        const employe = await Employe.findByPk(id);
        if (!employe) {
            return res.status(404).json({ message: "Employe non trouvé" });
        }
        await employe.update({ 
            Nom, 
            Prenom, 
            Naissance, 
            Telephone, 
            Email, 
            Mot_De_Passe, 
            Photo, 
            RoleId, 
            SecurSalleId 
        });
        res.status(200).json(employe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un Employe par son ID avec son Rôle et SecurSalle
export const recuperer_employe = async (req, res) => {
    try {
        const { id } = req.params;
        const employe = await Employe.findByPk(id, {
           
        });
        if (!employe) {
            return res.status(404).json({ message: "Employe non trouvé" });
        }
        res.status(200).json(employe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un Employe
export const supprimer_employe = async (req, res) => {
    try {
        
        const { id } = req.params;
        const employe = await Employe.findByPk(id);
        if (!employe) {
            return res.status(404).json({ message: "Employe non trouvé" });
        }
        await employe.destroy();
        res.status(200).json({ message: "Employe supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const modifierPartiellementEmploye = async (req, res) => {
    try {
        const { id } = req.params;
        
        const employe = await Employe.findByPk(id);
        if (!employe) {
            return res.status(404).json({ message: "Employe non trouvé" });
        }
        console.log("Valeurs reçues pour la mise à jour:", req.body);
        // Mettre à jour uniquement les champs fournis dans req.body
        for (const [key, value] of Object.entries(req.body)) {
            if (value != null) { // Assurez-vous de ne pas mettre à jour avec des valeurs null/undefined
                employe[key] = value;
            }
        }

        await employe.save(); // Sauvegarde les modifications
        res.status(200).json(employe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
