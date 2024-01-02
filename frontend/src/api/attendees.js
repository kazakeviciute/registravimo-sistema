import axios from 'axios';
import {API} from './consts';

export const fetchAttendees = async () => {
  const response = await axios.get(`${API}/attendees`);
  return response.data;
}

export const createAttendee = async (attendee) => {
  const response = await axios.post(`${API}/attendees`, attendee);
  return response.data;
}
