import { GitHub, LinkedIn } from '@mui/icons-material';
import Google from '../../../assets/images/icons/google.svg';
import Zoom from '../../../assets/images/icons/Zoom App.svg';
interface SocialProvider {
  icon: React.ComponentType;
  color: string;
}
interface Social {
  [key: string]: SocialProvider;
}
export const Social: Social = {
  Github: {
    color: '#131418',
    icon: GitHub,
  },
  Linkedin: {
    color: '#0077B5',
    icon: LinkedIn,
  },

  Google: {
    color: 'red',
    icon: () => <img src={Google} width={20} height={20} />,
  },
  Zoom: {
    color: 'blue',
    icon: () => <img src={Zoom} width={20} height={20} />,
  },
};
