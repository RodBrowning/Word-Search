import './style.scss';
import './style-mobile.scss';

import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="inner-panel inner-panel-contact">
      <div className="contact-text">
        <span className="under-bar">
          <h1>Contacte me</h1>
        </span>
        <p>
          Oi. Eu sou Rodrigo Moura e estudo desenvolvedor web desde 2017. Este é um dos meus projetos de portfólio. Você
          poderá encontrar mais detalhes do seu desenvolvimento no Github:
          <br />
          <a href="https://github.com/RodBrowning/Word-Search" target="_black">
            https://github.com/RodBrowning/Word-Search
          </a>
        </p>
        <p>Entre em contato para fazer qualquer pergunta ou sugestão.</p>
      </div>
      <form action="" className="contact-form">
        <label htmlFor="nome">
          Nome
          <input type="text" size={10} name="nome" />
        </label>
        <label htmlFor="email">
          E-mail
          <input type="email" size={10} name="email" />
        </label>
        <label htmlFor="mensagem">
          Mensagem
          <textarea rows={10} cols={10} name="mensagem" />
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
    </div>
  );
};

export default Contact;
