import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactTestUtils from 'react-dom/test-utils'
import {shallow, mount, render} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'
import Input from './Input'

describe("Input", () => {	
	const testTitle = "test input";

	it("should render correctly", () => {
		expect(shallow(<Input title={testTitle} />).find('div').exists()).toBe(true);
	});

	it("renders input", () => {
		expect(shallow(<Input title={testTitle} />).find('input').exists()).toBe(true);
	});
	
	it("should update state with input", () => {
		const component = shallow(<Input title={testTitle} />);
		component.find('input').simulate('change', {
			target: {
				value: 'test input'
			}
		});
		expect(component.state('value')).toEqual('test input');
	});
/*
	it("renders title somewhere", () => {
		const result = renderer.root.find(
			);		
		chai.assert.strictEqual(result.children[0].);
	});
	*/
});