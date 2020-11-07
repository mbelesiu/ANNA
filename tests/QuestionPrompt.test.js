import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import QuestionPrompt from '../client/components/QuestionPrompt';
Enzyme.configure({
    adapter: new EnzymeAdapter()
})

describe('QuestionPrompt', () => {

    describe('function', () => {
        const wrapper = shallow(<QuestionPrompt
            promptsCount={1}
            addToPrompts={() => (null)}
            finalQuestion={false}
            setFinalQuestion={() => (null)}
            showQuestions={true}
            submitPrompts={() => (null)}
            setFlag={() => (null)}
        />);

        test('render without error', () => {
            expect(wrapper.exists()).toBe(true);
        });


    })

})