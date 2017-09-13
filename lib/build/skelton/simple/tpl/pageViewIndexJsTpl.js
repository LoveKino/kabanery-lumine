'use strict';

module.exports = ({defaultPage}) => `'use strict';

let ${defaultPage} = require('./${defaultPage}');

module.exports = {
    ${defaultPage}
};
`;
