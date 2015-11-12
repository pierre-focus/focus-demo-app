import FocusCore from 'focus-core';
import FocusComponents from 'focus-components';

import DemoMenuLeft from '../views/menu/MenuLeft';

const render = FocusCore.application.render;
const Layout = FocusComponents.components.Layout;

render(Layout, '[data-focus="application"]', {
    props: {
        MenuLeft: DemoMenuLeft
    }
});