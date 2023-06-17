import ReactDOM, { createPortal } from 'react-dom';

const ToastPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById('information-modal')!);
};
export default ToastPortal;
