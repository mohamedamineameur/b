import {Parking, Voiture, SecurSalle } from "../models/relation.js";
import validerVoiture from "../validation/ValidationVoiture.js";


export const liste_voiture = async (req, res) => {
    try {
        
        //retourner la liste complete des etudiants
        const resultat = await Voiture.findAll({
           /* include: [{
                model: Parking,
                include: [SecurSalle] 
                
            }]*/

            
        
        })
            
        res.status(200).json({ data: resultat })

    } catch (error) {

        res.json({ error: error.message })
    }
}
export const ajout_voiture = async (req, res) => {
    const { id, Marque, Modele, Type_de_voiture, Annee_de_fabrication, Disponibilite, Prix_par_jour, ParkingCouleurDuParking } = req.body;

    const errors = validerVoiture(req.body);
    if (errors !== true) {
        return res.status(400).json({ errors });
    }
    try {
        const voitureExistante = await Voiture.findByPk(id);
        if (voitureExistante) {
            return res.status(400).json({ error: "Cet ID est déjà attribué." });
        }
        await Voiture.create({ id, Marque, Modele, Type_de_voiture, Annee_de_fabrication, Disponibilite, Prix_par_jour, ParkingCouleurDuParking });
        res.status(201).json({ message: "Voiture ajoutée avec succès." });
    } catch (error) { // Ajout de 'error' dans le paramètre du catch
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



export const modifier_voiture=async(req,res)=>{

    const {id}=req.params
    const voiture=req.body
    try{

        await Voiture.update(voiture, {where:{id}})
        res.status(200).json({ message:"etuiant mis a jour" })
    }
    catch (error) {

        res.status(404).json({ error: error.message })
    }

}

export const voitureParId = async (req, res) => {
    const id = req.params.id;

    
    try {
        const resultat = await Voiture.findByPk(id, {
            include: [{
                model: Parking,
                include: [SecurSalle] 
            }]
        });

   
        res.status(200).json({ data: resultat });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


export function voitureParId2(ID){
    const id=ID
    
        const resultat = Voiture.findByPk(id)
        return resultat

    

}

export const supprimer_voiture = async (req, res) => {
    const { id } = req.params;
    try {
        const voiture = await Voiture.findByPk(id);
        if (!voiture) {
            return res.status(404).json({ message: "Voiture non trouvée" });
        }

       
        await voiture.destroy();
        res.status(200).json({ message: "Voiture supprimée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};