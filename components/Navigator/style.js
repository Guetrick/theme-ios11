import { css } from 'glamor';
import colors from 'Styles/colors';
import variables from 'Styles/variables';

const header = css({
  position: 'fixed',
  paddingTop: 'var(--safe-area-inset-top)',
  left: 0,
  top: 0,
  width: '100%',
  background: colors.light,
  zIndex: 2,
}).toString();

let prevHeight = variables.navigator.height;
let heightClass = '';
// TODO: check for a better way to do this
// TODO: this doesn't even work because of the shouldComponentUpdate check :(
const getHeaderHeight = () => {
  console.warn(prevHeight, variables.navigator.height);
  if (!heightClass || prevHeight !== variables.navigator.height) {
    prevHeight = variables.navigator.height;
    heightClass = css({
      height: `calc(${variables.navigator.height}px + var(--safe-area-inset-top))`,
    }).toString();
  }

  return heightClass;
};

const grid = css({
  alignItems: 'center',
  height: '100%',
}).toString();

const title = css({
  position: 'relative',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingLeft: variables.gap.big,
  paddingRight: variables.gap.big,
  fontSize: '1.25rem',
  fontWeight: 500,
}).toString();

const applyButton = css({
  marginRight: 4,
}).toString();

export default {
  header,
  getHeaderHeight,
  grid,
  title,
  applyButton,
};
