import db from '../db';
import bcrypt from 'bcrypt';

interface User {
  id: number;
  username: string;
  password: string;
  created_at?: Date;
}

const createUser = async (username: string, password: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [user] = await db('users').insert({ username, password: hashedPassword }).returning('*');
  return user;
};

const getUserByUsername = async (username: string): Promise<User | undefined> => {
  return db('users').where({username}).first();

};

const getUserById = async (id: number): Promise<User | undefined> => {
  return db('users').where({ id }).first();
};

export { createUser, getUserByUsername, getUserById, User };
