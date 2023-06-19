import './style.scss';
import './style-mobile.scss';
import 'react-toastify/dist/ReactToastify.css';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import React from 'react';
import { SendMsg } from '../../utils/fetchFunctions/sendEmail';
import ToastPortal from '../toastPortal';

type TInputs = {
  name: string;
  email: string;
  message: string;
};

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = async (data: TInputs) => {
    const res = await SendMsg(data.name, data.email, data.message);
    if (res.data === 'OK') {
      reset();
      toast.success(
        <>
          <p>Mensagem enviada com sucesso</p>
        </>,
        {
          autoClose: 10000,
        }
      );
    } else {
      toast.error(
        <>
          <p>Ocorreu um erro</p>
          <p>Mensagem não enviada</p>
        </>,
        {
          autoClose: 5000,
        }
      );
    }
  };

  return (
    <div className="inner-panel inner-panel-contact">
      <div className="contact-text">
        <span className="under-bar">
          <h1>Contacte me</h1>
        </span>
        <p>
          Sou Rodrigo Moura, um desenvolvedor web com experiência desde 2017. Gostaria de apresentar a você um dos
          projetos do meu portfólio, um "Caça Palavras" em Javascript. Para obter mais detalhes sobre o seu
          desenvolvimento, convido-o(a) a visitar o meu perfil no GitHub:{' '}
          <a href="https://github.com/RodBrowning/Word-Search" target="_black">
            https://github.com/RodBrowning/Word-Search
          </a>
        </p>
        <p>
          Estou à disposição para responder a qualquer pergunta ou sugestão que possa ter. Sinta-se à vontade para
          entrar em contato e compartilhar suas ideias.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            size={10}
            {...register('name', {
              required: 'OBRIGATÓRIO',
              pattern: { value: /^[a-zA-ZÀ-ÿ'0-9]{3,}( [a-zA-ZÀ-ÿ'0-9]+)*$/, message: 'INVÁLIDO' },
              onBlur: async () => {
                await trigger('name');
              },
            })}
          />
          {errors.name && <span className="errorMsg">{errors.name.message}</span>}
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            size={10}
            {...register('email', {
              required: 'OBRIGATÓRIO',
              pattern: { value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'INVÁLIDO' },
              onBlur: async () => {
                await trigger('email');
              },
            })}
          />
          {errors.email && <span className="errorMsg">{errors.email.message}</span>}
        </label>
        <label htmlFor="message">
          Mensagem
          <textarea
            rows={10}
            cols={10}
            {...register('message', {
              required: 'OBRIGATÓRIA',
              pattern: { value: /^[a-zA-Z0-9.,!?'"()\[\]{}\s]{3,}$/, message: 'INVÁLIDA' },
              onBlur: async () => {
                await trigger('message');
              },
            })}
          />
          {errors.message && <span className="errorMsg">{errors.message.message}</span>}
        </label>
        <button type="submit">
          <span>
            <p>Enviar</p>
          </span>
          <span>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.7761 0.370612L0.885706 5.97041C0.630106 6.06041 0.573406 6.28091 0.876706 6.40151L4.29311 7.77041L6.31811 8.58131L16.2037 1.32191C16.3369 1.22471 16.4899 1.40741 16.3936 1.51181L9.30971 9.17351V9.17531L8.90291 9.62801L9.44201 9.91781L13.9258 12.3316C14.1877 12.472 14.527 12.3559 14.6026 12.031L17.218 0.758512C17.2891 0.449812 17.0848 0.261712 16.7761 0.370612ZM6.30011 13.4458C6.30011 13.6672 6.42521 13.7293 6.59801 13.5727C6.82391 13.3666 9.16301 11.2678 9.16301 11.2678L6.30011 9.78821V13.4458Z"
                fill="#0D0701"
              />
            </svg>
          </span>
        </button>
      </form>
      <ToastPortal>
        <ToastContainer
          position="top-center"
          limit={3}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          theme="colored"
          icon={false}
        />
      </ToastPortal>
    </div>
  );
};

export default Contact;
