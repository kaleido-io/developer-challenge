# DataSpoken

This project is created by Seon Kim as a participation in the Kaleido Developer Challenge.

This project aims to solve research data fabrication by freezing the raw research data on chain at initial time, and providing the connection between the data and the final outcome (e.g. research paper). The goal of this project is to demonstrate an end-to-end workflow through the UIs representing each party that is involved in the process.

## Key Components

### Smart Contracts (`/backend_dataspoken/contracts`)

- Raw Data (`RawData.sol`)
  - Contains: metadata of raw data as well as the data hash value of the original file.
  - Business logic: access control based on the creator's approval.
- Papers (`Papers.sol`)
  - Contains: metadata of papers along with a list of raw data on-chain ids to keep the associations with the raw data.
  - Business logic: propagates the publish state to the associated raw data when the paper is published to a journal.
- Journals (`Journals.sol`)
  - Contains: metadata of journals, `mapping(journal=>papers)` and reviewer profiles(reviewer score, reviewed papers)
  - Business logic: receives submission of papers from the authors, receives reviews from reviewers and retracts papers from the journal.

### UI + Backend Services

Although both DataSpoken and Conference are served by one common UI (`/frontend`), they represent different parties in the ecosystem, being backed by two separate backend services(`/backend_dataspoken`, `/backend_conference`).

- DataSpoken
  - Data Studio: experimenters and authors can register raw data and compose them into a paper.
  - Paper Viewer: also provides link to the raw data from included figures for verification.
- Conference: present all journals with published papers as well as the reviewer profile, if the user has reviewed.




## Progress

### 4/24/2023
- Basic structures of the backend and the UI have been created.
- Smart contracts to handle core entities have been added.
- Connection to Kaleido Smart Contract REST APIs from the backend service is in place and has been tested.
- Some of the essential business logic has been implemented in UI, although still heavily WIP.

### 4/26/2023
- Added paper viewer

### 4/27/2023
- Added journal and review workflows
- Demo ready