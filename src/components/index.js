import { forEach } from 'lodash';
import requireContext from 'require-context.macro';

const req = requireContext('../components', true, /index\.jsx$/);
const cache = {};
function getAllComponents() {
  forEach(req.keys(), (key) => {
    if (!/^\.\/index.tsx$/.test(key)) {
      const regex = /^\.\/([^/]+)[/].+/;
      const found = key.match(regex)[1];
      const newKey = found
        .split('-')
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
        .join('');
      cache[newKey] = req(key).default;
    }
  });
  return { ...cache, __esModule: true };
}

export default getAllComponents();
