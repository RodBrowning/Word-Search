import Bible from './bible';
import Birds from './birds';
import Cars from './cars';
import Companies from './companies';
import Countries from './countries';
import Land from './land';
import Marine from './marine';
import Names from './names';
import Sports from './sports';

const Themes = {
  ...Names(),
  ...Sports(),
  ...Countries(),
  ...Land(),
  ...Birds(),
  ...Marine(),
  ...Bible(),
  ...Cars(),
  ...Companies(),
};

export default Themes;
