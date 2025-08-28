import useSWR from 'swr';
import axios from 'axios';

export default function UserProgressTracker({ userId }) {
  const { data