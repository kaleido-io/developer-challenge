import React, { useEffect, useState } from 'react';
import { getPolls } from '../services/pollService';
import Poll from "./Poll";

const PollList = () => {
  const [polls, setPolls] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await getPolls();
      if (response.error) {
        setMessage(response.error);
      } else {
        setPolls(response);
      }
    };
    const token = localStorage.getItem('token');
    if (token) {
      fetchPolls();
    }

  }, []);

  return (
    <div className="mt-8">
      {localStorage.getItem('token')
        ? <h2 className="text-xl font-bold mb-4">Available Polls</h2>
        : <h1 className="text-xl font-bold mb-4">To create a poll or vote in a poll, please log in or create an account!</h1>
      }

      {message && <p className="mt-4">{message}</p>}

      {polls.map((poll) => (
        <Poll key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollList;
