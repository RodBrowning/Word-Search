import Animals from './animals';
import Aquatic from './aquatic';
import Bible from './bible';
import Birds from './birds';
import Cars from './cars';
import Companies from './companies';
import Names from './names';
import sports from './sports';

const Themes = {
  ...Animals(),
  ...Cars(),
  ...Bible(),
  ...Birds(),
  ...Companies(),
  ...Aquatic(),
  ...Names(),
  ...sports(),
};

export default Themes;
