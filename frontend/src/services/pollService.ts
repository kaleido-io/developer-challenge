// TODO: make configurable
const API_URL = 'http://localhost:4001';

export const createPoll = async (title: string, question: string, options: string[]) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/polls/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, question, options }),
  });
  return response.json();
};

export const getPolls = async () => {
  const response = await fetch(`${API_URL}/polls`);
  return response.json();
};

export const vote = async (option_id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/polls/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({option_id}),
  });
  return response.json()
};

export const getVotesByPollId = async (pollId: string) => {
  const response = await fetch(`${API_URL}/polls/${pollId}/votes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
