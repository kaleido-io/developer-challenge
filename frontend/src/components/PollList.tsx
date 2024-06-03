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
    fetchPolls();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Available Polls</h2>
      {message && <p className="mt-4">{message}</p>}

      {polls.map((poll) => (
        <Poll key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollList;
