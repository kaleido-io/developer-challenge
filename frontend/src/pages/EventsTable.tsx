import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

interface PollCreatedEvent {
  id: number;
  question: string;
  creator_hash: string;
  creator_address: string;
  created_at: string;
}

interface VoteRecordedEvent {
  id: number;
  poll_id: number;
  option_id: number;
  voter_hash: string;
  voter_address: string;
  created_at: string;
}

// TODO: make configurable
const API_URL = 'http://localhost:4001';

const EventsTable = () => {
  const [pollCreatedEvents, setPollCreatedEvents] = useState<PollCreatedEvent[]>([]);
  const [voteRecordedEvents, setVoteRecordedEvents] = useState<VoteRecordedEvent[]>([]);

  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchPollCreatedEvents();
    fetchVoteRecordedEvents();
  }, []);

  const fetchPollCreatedEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/events/poll_created_events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Something happened');
      }
      const data: PollCreatedEvent[] = await response.json();
      setPollCreatedEvents(data);
    } catch (error) {
      console.error('Error fetching poll created events:', error);
    }
  };

  const fetchVoteRecordedEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/events/vote_recorded_events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: VoteRecordedEvent[] = await response.json();
      setVoteRecordedEvents(data);
    } catch (error) {
      console.error('Error fetching vote recorded events:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
        <button
          onClick={navigateToMainPage}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Main Page
        </button>
      <h1 className="text-2xl font-bold mb-4">Event Logs</h1>
      <h2 className="text-2xl font-bold mb-4">Poll Created Events</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Question</th>
            <th className="py-2 px-4 border-b">Creator Hash</th>
            <th className="py-2 px-4 border-b">Creator Address</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
          </thead>
          <tbody>
          {pollCreatedEvents.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{event.id}</td>
              <td className="py-2 px-4 border-b truncate" title={event.question}>{event.question}</td>
              <td className="py-2 px-4 border-b truncate" title={event.creator_hash}>{event.creator_hash}</td>
              <td className="py-2 px-4 border-b truncate" title={event.creator_address}>{event.creator_address}</td>
              <td className="py-2 px-4 border-b">{new Date(event.created_at).toLocaleString()}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Vote Recorded Events</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Poll ID</th>
            <th className="py-2 px-4 border-b">Option ID</th>
            <th className="py-2 px-4 border-b">Voter Hash</th>
            <th className="py-2 px-4 border-b">Voter Address</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
          </thead>
          <tbody>
          {voteRecordedEvents.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{event.id}</td>
              <td className="py-2 px-4 border-b">{event.poll_id}</td>
              <td className="py-2 px-4 border-b">{event.option_id}</td>
              <td className="py-2 px-4 border-b truncate" title={event.voter_hash}>{event.voter_hash}</td>
              <td className="py-2 px-4 border-b truncate" title={event.voter_address}>{event.voter_address}</td>
              <td className="py-2 px-4 border-b">{new Date(event.created_at).toLocaleString()}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
