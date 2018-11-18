import FooterButton from './FooterButton';
import FooterButtonHOC from './FooterButtonHOC';
const elements = [
  {
    name: "Blizu mene",
    imageUrl: require('../../imgs/lokacija.png'),
    route: "",
  },
  {
    name: "Pretraga",
    imageUrl: require('../../imgs/pretraga.png'),
    route: "",
  },
  {
    name: 'Obaveštenja',
    imageUrl: require('../../imgs/notifikacije.png'),
    route: '',
  },
  {
    name: 'Moj profil',
    imageUrl: require('../../imgs/mojProfil.png'),
    route: '',
  },
]

const createHoc = (onSelect) => {
  let mapers = elements.map((item, index) => {
    return { element: () => FooterButtonHOC(FooterButton, onSelect, index, item.name, item.imageUrl, item.route) }
  })
  return mapers;
}
export default createHoc;
