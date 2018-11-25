import Typy from './typy';

const t = (input, objectPath) => new Typy().t(input, objectPath);
const { Schema } = Typy;

export default t;
export { Schema };
