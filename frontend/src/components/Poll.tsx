import React, {useCallback, useEffect, useState} from 'react';
import {getVotesByPollId, vote} from '../services/pollService';
import useWebSocket from "../hooks/useWebSocket";

interface Option {
  id: string;
  text: string;
}

interface PollWithOptions {
  id: string;
  title: string;
  question: string;
  options: Option[];
  created_at: string;
}

interface PollProps {
  poll: PollWithOptions;
}

const Poll: React.FC<PollProps> = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const handleVote = async () => {
    if (!selectedOption) {
      setMessage('Please select an option.');
      return;
    }

    try {
      const response = await vote(selectedOption);
      if (response.error) {
        setMessage(response.error);
      } else {
        setMessage('Vote submitted successfully!');
      }
    } catch (error) {
      setMessage('Error submitting vote.');
    }
  };

  const fetchVotes = useCallback(async () => {
    // Fetch current votes from the server
    // This part depends on your backend implementation
    // Assuming a function getVotesByPollId exists in pollService
    const response = await getVotesByPollId(poll.id);
    if (response.error) {
      setMessage(response.error);
    } else {
      const voteCounts: { [key: string]: number } = {};
      response.forEach((vote: { option_id: string }) => {
        if (!voteCounts[vote.option_id]) {
          voteCounts[vote.option_id] = 0;
        }
        voteCounts[vote.option_id]++;
      });
      setVotes(voteCounts);
    }
  }, [poll.id]);

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);

    if (data.pollId === poll.id) {
      fetchVotes();
    }
  }, [poll.id, fetchVotes]);

  useWebSocket('ws://localhost:4002', handleWebSocketMessage);

  if (!poll || !poll.options) {
    return <div>Loading poll...</div>;
  }

  const totalVotes = Object.values(votes).reduce((total, count) => total + count, 0);

  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="text-lg font-bold">{poll.title}</h3>
      <p>{poll.question}</p>
      <p>Created At: {new Date(poll.created_at).toLocaleDateString()}</p>
      <div className="mt-4">
        {poll.options.map((option) => (
          <div key={option.id} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={`poll-${poll.id}`}
                value={option.id}
                onChange={() => setSelectedOption(option.id)}
                className="mr-2"
              />
              {option.text}
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(votes[option.id] || 0) / totalVotes * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleVote} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Submit Vote
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Poll;
