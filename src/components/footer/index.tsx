import './style.scss';
import './style-mobile.scss';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="copyright">
        <p>Copyright © 2023. Todos os direitos reservados. Desenvolvido por Rodrigo&nbsp;da&nbsp;Silva&nbsp;Moura.</p>
      </div>
      <div className="social-media">
        <a href="https://github.com/RodBrowning" target="_blank" rel="noreferrer">
          <div className="img">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9631 0.568176C6.33685 0.568176 0.963867 5.96171 0.963867 12.6165C0.963867 17.9385 4.40186 22.4541 9.17111 24.0474C9.77111 24.1581 9.99011 23.7861 9.99011 23.4668C9.99011 23.1807 9.9796 22.4232 9.9736 21.418C6.63535 22.1461 5.93112 19.8029 5.93112 19.8029C5.38587 18.4114 4.59912 18.0409 4.59912 18.0409C3.50937 17.2932 4.68161 17.3083 4.68161 17.3083C5.88536 17.3933 6.5191 18.5499 6.5191 18.5499C7.5901 20.3909 9.32787 19.8593 10.0119 19.5506C10.1206 18.7721 10.4311 18.2412 10.7739 17.94C8.10911 17.6358 5.30786 16.6027 5.30786 11.9863C5.30786 10.6708 5.77512 9.59557 6.54312 8.75299C6.41937 8.44804 6.00763 7.22371 6.66013 5.56491C6.66013 5.56491 7.66811 5.24112 9.96011 6.79977C10.9179 6.53247 11.9439 6.39919 12.9646 6.39392C13.9839 6.39919 15.0106 6.53247 15.9691 6.79977C18.2596 5.24112 19.2654 5.56491 19.2654 5.56491C19.9201 7.22371 19.5084 8.44804 19.3846 8.75299C20.1541 9.59557 20.6184 10.6708 20.6184 11.9863C20.6184 16.614 17.8126 17.6328 15.1396 17.931C15.5701 18.3029 15.9541 19.0379 15.9541 20.162C15.9541 21.7727 15.9391 23.0715 15.9391 23.4668C15.9391 23.7891 16.1551 24.1641 16.7641 24.0459C21.5289 22.4496 24.9639 17.937 24.9639 12.6165C24.9639 5.96171 19.5909 0.568176 12.9631 0.568176Z"
                fill="#FFE8C6"
              />
            </svg>
          </div>
        </a>
        <div className="img">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.8364 8.63192C17.7322 8.36224 17.5728 8.11735 17.3683 7.91304C17.1637 7.70872 16.9187 7.54952 16.6489 7.44568C16.2774 7.30808 15.885 7.23536 15.4889 7.23068C14.8301 7.20068 14.6326 7.19317 12.9639 7.19317C11.2951 7.19317 11.0976 7.20068 10.4389 7.23068C10.0423 7.23521 9.64951 7.30794 9.27762 7.44568C9.00793 7.5498 8.76304 7.70927 8.55873 7.91379C8.35442 8.11832 8.19522 8.36338 8.09137 8.63317C7.95378 9.00467 7.88105 9.39705 7.87637 9.79317C7.84637 10.4519 7.83887 10.6494 7.83887 12.3182C7.83887 13.9869 7.84637 14.1844 7.87637 14.8432C7.88091 15.2397 7.95364 15.6325 8.09137 16.0044C8.1955 16.2741 8.35496 16.519 8.55949 16.7233C8.76402 16.9276 9.00907 17.0868 9.27887 17.1907C9.65036 17.3283 10.0427 17.401 10.4389 17.4057C11.0976 17.4357 11.2951 17.4419 12.9639 17.4419C14.6326 17.4419 14.8301 17.4357 15.4889 17.4044C15.8853 17.4003 16.2782 17.328 16.6501 17.1907C16.9198 17.0865 17.1647 16.9271 17.369 16.7226C17.5733 16.518 17.7325 16.273 17.8364 16.0032C17.974 15.6317 18.0467 15.2393 18.0514 14.8432C18.0814 14.1844 18.0876 13.9869 18.0876 12.3182C18.0876 10.6494 18.0814 10.4519 18.0501 9.79317C18.046 9.3967 17.9737 9.00389 17.8364 8.63192V8.63192ZM12.9639 15.5282C12.329 15.5282 11.7084 15.3399 11.1805 14.9872C10.6526 14.6345 10.2412 14.1331 9.99822 13.5466C9.75526 12.96 9.69169 12.3146 9.81555 11.6919C9.93941 11.0693 10.2451 10.4973 10.6941 10.0484C11.143 9.59943 11.715 9.29371 12.3376 9.16985C12.9603 9.046 13.6057 9.10956 14.1923 9.35252C14.7788 9.59548 15.2802 10.0069 15.6329 10.5348C15.9856 11.0627 16.1739 11.6833 16.1739 12.3182C16.1739 13.1695 15.8357 13.986 15.2337 14.588C14.6317 15.19 13.8152 15.5282 12.9639 15.5282ZM16.3001 9.73192C16.1518 9.73192 16.0068 9.68794 15.8834 9.60553C15.7601 9.52312 15.664 9.40598 15.6072 9.26894C15.5504 9.13189 15.5356 8.98109 15.5645 8.83561C15.5935 8.69012 15.6649 8.55648 15.7698 8.45159C15.8747 8.34671 16.0083 8.27527 16.1538 8.24634C16.2993 8.2174 16.4501 8.23225 16.5871 8.28902C16.7242 8.34578 16.8413 8.44191 16.9237 8.56525C17.0061 8.68858 17.0501 8.83359 17.0501 8.98192C17.0501 9.18084 16.9711 9.3716 16.8305 9.51225C16.6898 9.65291 16.499 9.73192 16.3001 9.73192V9.73192ZM15.0476 12.3182C15.0476 12.7303 14.9254 13.1332 14.6964 13.4758C14.4675 13.8185 14.142 14.0856 13.7613 14.2433C13.3805 14.401 12.9616 14.4423 12.5574 14.3619C12.1531 14.2815 11.7819 14.083 11.4904 13.7916C11.199 13.5002 11.0006 13.1289 10.9202 12.7247C10.8398 12.3205 10.881 11.9015 11.0387 11.5208C11.1965 11.14 11.4635 10.8146 11.8062 10.5856C12.1489 10.3566 12.5517 10.2344 12.9639 10.2344C13.5165 10.2344 14.0465 10.454 14.4373 10.8447C14.8281 11.2355 15.0476 11.7655 15.0476 12.3182V12.3182ZM12.9639 0.318176C10.5905 0.318176 8.27042 1.02196 6.29703 2.34054C4.32364 3.65912 2.78557 5.53326 1.87732 7.72597C0.969067 9.91869 0.731427 12.3315 1.19445 14.6593C1.65747 16.987 2.80036 19.1252 4.47859 20.8035C6.15682 22.4817 8.29502 23.6246 10.6228 24.0876C12.9506 24.5506 15.3634 24.313 17.5561 23.4047C19.7488 22.4965 21.6229 20.9584 22.9415 18.985C24.2601 17.0116 24.9639 14.6915 24.9639 12.3182C24.9639 9.13558 23.6996 6.08333 21.4491 3.83289C19.1987 1.58246 16.1465 0.318176 12.9639 0.318176V0.318176ZM19.1764 14.8944C19.1658 15.4131 19.0673 15.9262 18.8851 16.4119C18.7246 16.827 18.4791 17.204 18.1644 17.5187C17.8497 17.8334 17.4727 18.0789 17.0576 18.2394C16.5723 18.4215 16.0596 18.5199 15.5414 18.5307C14.8739 18.5607 14.6614 18.5682 12.9639 18.5682C11.2664 18.5682 11.0539 18.5607 10.3864 18.5307C9.86813 18.5199 9.35545 18.4215 8.87012 18.2394C8.45502 18.0789 8.07804 17.8334 7.76334 17.5187C7.44864 17.204 7.20315 16.827 7.04262 16.4119C6.86057 15.9266 6.7621 15.4139 6.75137 14.8957C6.72137 14.2282 6.71387 14.0157 6.71387 12.3182C6.71387 10.6207 6.72137 10.4082 6.75137 9.74067C6.7617 9.22251 6.85975 8.70983 7.04137 8.22442C7.20189 7.80897 7.4475 7.43167 7.76244 7.11674C8.07737 6.80181 8.45467 6.5562 8.87012 6.39568C9.35553 6.21405 9.8682 6.116 10.3864 6.10568C11.0539 6.07568 11.2664 6.06818 12.9639 6.06818C14.6614 6.06818 14.8739 6.07568 15.5414 6.10568C16.0595 6.116 16.5722 6.21405 17.0576 6.39568C17.4728 6.55634 17.8499 6.80202 18.1646 7.11695C18.4793 7.43187 18.7247 7.8091 18.8851 8.22442C19.0672 8.70976 19.1656 9.22243 19.1764 9.74067C19.2064 10.4082 19.2139 10.6207 19.2139 12.3182C19.2139 14.0157 19.2064 14.2282 19.1764 14.8957V14.8944Z"
              fill="#FFE8C6"
            />
          </svg>
        </div>
        <div className="img">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.9604 0.318176C6.345 0.318176 0.963867 5.70081 0.963867 12.3181C0.963867 14.9424 1.81019 17.3762 3.24887 19.3517L1.75366 23.8101L6.36609 22.336C8.26317 23.5917 10.5271 24.3182 12.9673 24.3182C19.5827 24.3182 24.9639 18.9353 24.9639 12.3183C24.9639 5.70103 19.5827 0.318375 12.9673 0.318375H12.9604V0.318176ZM9.61029 6.41359C9.37761 5.85631 9.20126 5.83521 8.84875 5.82088C8.72873 5.81391 8.59497 5.80695 8.44669 5.80695C7.98809 5.80695 7.5086 5.94094 7.21939 6.2372C6.86689 6.59697 5.99228 7.43636 5.99228 9.15778C5.99228 10.8792 7.24765 12.544 7.41684 12.777C7.59319 13.0095 9.86426 16.5933 13.3905 18.0539C16.148 19.1968 16.9663 19.0908 17.5939 18.9568C18.5107 18.7593 19.6604 18.0818 19.9496 17.2637C20.2388 16.4452 20.2388 15.7468 20.154 15.5986C20.0694 15.4505 19.8365 15.3661 19.484 15.1895C19.1315 15.0131 17.4175 14.1665 17.0931 14.0536C16.7756 13.9338 16.4725 13.9762 16.2328 14.3148C15.8943 14.7875 15.5629 15.2673 15.2948 15.5564C15.0832 15.7822 14.7374 15.8105 14.4484 15.6904C14.0605 15.5283 12.9745 15.1471 11.6344 13.9549C10.5976 13.0308 9.89234 11.8811 9.68793 11.5354C9.48331 11.1828 9.66681 10.9779 9.82883 10.7876C10.0052 10.5688 10.1744 10.4137 10.3507 10.209C10.5271 10.0045 10.6258 9.89862 10.7387 9.65871C10.8587 9.42596 10.7739 9.18605 10.6893 9.00964C10.6047 8.83324 9.8995 7.11183 9.61029 6.41359Z"
              fill="#FFE8C6"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
