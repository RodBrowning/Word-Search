import axios, { AxiosError } from 'axios';

export const SendMsg = (name: string, email: string, message: string) => {
  const data = {
    service_id: import.meta.env.VITE_SERVICE_ID,
    template_id: import.meta.env.VITE_TEMPLATE_ID,
    user_id: import.meta.env.VITE_USER_ID,
    template_params: {
      name: name,
      email: email,
      message: message,
    },
  };

  return axios
    .post(import.meta.env.VITE_EMAILJS_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return { data: 'BAD' };
    });
};
