import { memo } from 'react';
import PropTypes from 'prop-types';

import SearchItem from '../SearchItem/SearchItem';

function RenderSearchResult({ data, value }) {
    return data.map((user) => <SearchItem key={user.id} data={user} />);
}

RenderSearchResult.propTypes = {
    data: PropTypes.array.isRequired,
};
export default memo(RenderSearchResult);
