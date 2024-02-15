import {Client}from'../models/relation.js'

//Importer le module qui cree le jeton d'authentification (token)
import jwt from 'jsonwebtoken'

//Importer le module de hachage
import bcrypt from 'bcryptjs'

export const loginCliente = async (req, res) => {
    //Recuperation du login et mot de passe de l'utilisateur

    const { email, motDePasse } = req.body

    
    if (!email) return res.status(404).json({ message: "L'email est obligatoire!" })

    try {
        //Allons-y chercher l'utilisateur dans la base de donnee
        const user = await Client.findOne({ where: { email } })

        if (!user) return res.status(404).json({ message: "Cet utilisateur n'existe pas" })

        //Verification du mot de passe

        const mdpVerifie = bcrypt.compareSync(motDePasse, user.motDePasse)

        if (!mdpVerifie) return res.status(400).json({ message: "Mot de passe incorrect" })

        //Tout est correct, nous allons donner une clef (token) a l'utilisateur

        const payload = { id: user.id }

        const token = jwt.sign(payload, process.env.Code2)

        res.status(200).json({ data: user, token })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}