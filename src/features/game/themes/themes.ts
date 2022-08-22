import Animals from './animals';
import Cars from './cars';

const Themes = { ...Animals(), ...Cars() };

export default Themes;
