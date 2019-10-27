import db from '../database'
import ClubService from '../services/clubService'

function getAllClubs(req, res) {
    const clubService = new ClubService(db)
    clubService
        .getAllClubs()
        .then(clubs => res.json(clubs))
        .catch(reason => res.json(reason))
}

function getClub(req, res) {
    const clubService = new ClubService(db)
    clubService
        .getClub(parseInt(req.params.id))
        .then(club => res.json(club))
        .catch(reason => res.json(reason))
}

export const clubController = {
    getAllClubs,
    getClub
}