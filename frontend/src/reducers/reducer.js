export const ACTION_TYPES = {
    RAWDATA_CREATED: 'rawdata_created',
    PAPER_CREATED: 'paper_created',
    JOURNAL_CREATED: 'journal_created'
};

export const INITIAL_STATE = {
    rawData: [],
    papers: [],
    journals: []
};

export function dataReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
    case ACTION_TYPES.RAWDATA_CREATED:
        return {
            ...state,
            rawData: [...state.rawData, action.newRawData]
        };
    case ACTION_TYPES.PAPER_CREATED:
        return {
            ...state,
            papers: [...state.papers, action.newPaper]
        };
    case ACTION_TYPES.JOURNAL_CREATED:
        return {
            ...state,
            journals: [...state.journals, action.newJournal]
        };
    default:
        return state;
    }
}

// export const MOCKED_STATE = {
//     rawData: [
//         {
//             id: 10,
//             dataType: 'image',
//             dataHash: '503e34e029f2cf4b3c13ee80c4edb0bd',
//             description: 'Not sure what to use it for yet tho.',
//             createdBy: '0x2aff4a6a607d34e0f2338df977fbe41f0de18b8a'
//         },
//         {
//             id: 11,
//             dataType: 'csv',
//             dataHash: '99244254c883b277d011e6d6b977c3ac',
//             description: 'Some numbers are comma separated.',
//             createdBy: '0x2aff4a6a607d34e0f2338df977fbe41f0de18b8a'
//         }
//     ],
//     papers: [
//         {
//             id: 0,
//             author: '0x2aff4a6a607d34e0f2338df977fbe41f0de18b8a',
//             title: 'My Great Paper',
//             organization: 'Happy University'
//         },
//         {
//             id: 1,
//             author: '0x2aff4a6a607d34e0f2338df977fbe41f0de18b8a',
//             title: 'My Great Paper II',
//             organization: 'Happy University'
//         }
//     ]
// };
