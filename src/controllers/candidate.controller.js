import Candidate from "../models/candidate.model.js";
import User from "../models/user.model.js";
import VotedUser from "../models/votes.model.js";

const saveCandidate = async (req,res) => {
    try {
        const candidate = new Candidate({
            names: req.body.names,
            nationalId: req.body.nationalId,
            profileUrl: req.body.profileUrl,
            votes: 0,
            missionStatement: req.body.missionStatement,
            gender: req.body.gender,
        });
        const savedCandidate = await candidate.save();
        return res.status(201).json({
            success: true,
            message: 'Candidate created successfully',
            data: savedCandidate
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error creating candidate',
            error: err.message
        })
    }
}

const getCandidates = async (req,res) => {
    try {
        const candidates = await Candidate.find();
        return res.status(200).json({
            success: true,
            message: 'Candidates retrieved successfully',
            data: candidates
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error retrieving candidates',
            error: err.message
        })
    }
}

const getCandidate = async (req,res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) return res.status(404).json({
            message: 'Candidate not found',
            success: false
        });
        return res.status(200).json({
            success: true,
            message: 'Candidate retrieved successfully',
            data: candidate
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error retrieving candidate',
            error: err.message
        })
    }
}

const updateCandidate = async (req,res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) return res.status(404).json({
            message: 'Candidate not found',
            success: false
        });
        candidate.names = req.body.names;
        candidate.nationalId = req.body.nationalId;
        candidate.profileUrl = req.body.profileUrl;
        candidate.votes = req.body.votes;
        candidate.missionStatement = req.body.missionStatement;
        candidate.gender = req.body.gender;
        const savedCandidate = await candidate.save();
        if (savedCandidate) return res.status(200).json({
            success: true,
            message: 'Candidate updated successfully',
            data: savedCandidate
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error updating candidate',
            error: err.message
        })
    }
}

const deleteCandidate = async (req,res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) return res.status(404).json({
            message: 'Candidate not found',
            success: false  
        });
        const deletedCandidate = await candidate.remove();
        if (deletedCandidate) return res.status(200).json({
            success: true,
            message: 'Candidate deleted successfully',
            data: deletedCandidate
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error deleting candidate',
            error: err.message
        })
    }
}

const getCandidateByPost = async (req,res) => {
    try {
        const candidate = await Candidate.find({missionStatement: req.params.missionStatement});
        return res.status(200).json({
            success: true,
            message: 'Candidate retrieved successfully',
            data: candidate
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error retrieving candidate',
            error: err.message
        })
    }
}

const getCandidateByParty = async (req,res) => {
    try {
        const candidate = await Candidate.find({nationalId: req.params.nationalId});
        return res.status(200).json({
            success: true,
            message: 'Candidate retrieved successfully',
            data: candidate
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error retrieving candidate',
            error: err.message
        })
    }
}

const incrementVotes = async (req, res) => {

    if (await checkIfVoted(req.params.id, req.user._id)) {
        return res.status(400).json({
            message: 'You have already voted for this candidate',
            success: false
        })
    }

    try {
        const candidate = await Candidate.findById(req.params.id);
        candidate.votes = candidate.votes + 1;
        const savedCandidate = await candidate.save();
        const votes = new VotedUser({
            votedUser: req.user._id,
            candidate: req.params.id
        });
        const savedVotes = await votes.save();
        if (savedCandidate && savedVotes) return res.status(200).json({
            success: true,
            message: 'Candidate voted successfully',
            data: savedCandidate
        })
    }
    catch (err) {
        return res.status(400).json({

            message: 'Error updating candidate',
            error: err.message
        })
    }
}

// function to check if the user has already voted that candidate
const checkIfVoted = async (candidateId, userId) => {
        const candidate = await Candidate.findById(candidateId);
        const voted = await VotedUser.find({votedUser: userId});
        if (voted.length <= 0){
            return false;
        }else {
            return true;
        };    
}


const getCandidateByVotes = async (req,res) => {
    try {
        const candidate = await Candidate.find({votes: req.params.votes});
        return res.status(200).json({
            success: true,
            message: 'Candidate retrieved successfully',
            data: candidate
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error retrieving candidate',
            error: err.message
        })
    }
}

const getCandidateBynames = async (req,res) => {
    try {
        const candidate = await Candidate.find({names: req.params.names});
        return res.status(200).json({
            success: true,
            message: 'Candidate retrieved successfully',
            data: candidate
        })
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error retrieving candidate',
            error: err.message
        })
    }
}
export {
    saveCandidate,
    getCandidates,
    getCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateByPost,
    getCandidateByParty,
    getCandidateByVotes,
    incrementVotes,
}