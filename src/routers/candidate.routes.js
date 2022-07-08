import express from 'express';
import { registerDefinition } from 'swaggiffy';
import { deleteCandidate, getCandidate, getCandidates, incrementVotes, saveCandidate, updateCandidate } from '../controllers/candidate.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const candidateRouter = express.Router({
    mergeParams: true
});

candidateRouter.route("/").post(saveCandidate);

candidateRouter.route('/').get(getCandidates);

candidateRouter.route('/:id').get(getCandidate);

candidateRouter.put('/vote/:id', [protect, authorize('Standard')], incrementVotes);


candidateRouter.route('/:id').delete(deleteCandidate);

registerDefinition(candidateRouter, {tags: 'Candidates', basePath: '/api/v1/candidates', mappedSchema: 'Candidate'});

export default candidateRouter;