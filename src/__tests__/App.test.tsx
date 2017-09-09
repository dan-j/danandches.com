import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json/';

import App from '../App';

describe('<App />', () => {
    it('Renders a default greeting', () => {
        const wrapper = shallow(<App />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

