import axios from 'axios';
import { User } from "firebase/auth";
import { Submit } from "../types/Submit";
import { Answer } from "../types/Answer";
import { SubmitRequest } from "../types/SubmitRequest";

export const createNewSubmit = async (submit: Submit, answers: Answer[], currentUser?: User | null) => {
  if (!currentUser) alert('ログインしてください。');
  try {
    const idToken = await currentUser?.getIdToken(true);
    const submitRequest: SubmitRequest = {
      submit,answers
    }
    const response = await axios.post('/api/submits', submitRequest, {
      headers: {
        'authorization': idToken || '',
        'Accenpt': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const data = response.data
    if (data?.message !== 'OK.') {
      throw new Error();
    }
    return true;
  } catch (err) {
    alert(err);
    return false;
  }
}