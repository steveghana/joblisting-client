const secondsToMs = (s: number) => s * 1000;
const minutesToMs = (m: number) => secondsToMs(m * 60);
const hoursToMs = (h: number) => minutesToMs(h * 60);
const daysToMs = (d: number) => hoursToMs(d * 24);

const config = {
  restApiPort: 5000,
  clienturl: '',
  development: {
    useHttps: false,
    accessibleExternally: false,
  },
  defaultPath: '/dashboard/default',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
};
export default config;
