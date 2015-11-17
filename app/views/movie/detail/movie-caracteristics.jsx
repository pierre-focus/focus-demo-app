//librairies
import React, {PropTypes} from 'react';
import FocusComponents from 'focus-components';

// web components
import Panel from 'focus-components/components/panel';
import {mixin as formMixin} from 'focus-components/common/form';

//stores & actions
import movieStore from '../../../stores/movie';
import {caracteristicsActions} from '../../../action/movie';

export default React.createClass({
    displayName: 'MovieCaracteristics',
    propTypes: {
        id: PropTypes.number
    },
    mixins: [formMixin],
    definitionPath: 'movie',
    stores: [{store: movieStore, properties: ['movie']}],
    action: caracteristicsActions,

    /** @inheritDoc */
    renderContent() {
        return (
            <Panel actions={this._renderActions} title='movie.detail.caracteristics'>
                {this.fieldFor('title')}
                {this.fieldFor('originalTitle')}
                {this.fieldFor('keywords')}
                {this.fieldFor('runtime')}
                {this.fieldFor('movieType')}
                {this.fieldFor('productionYear')}
            </Panel>
        );
    }
});
