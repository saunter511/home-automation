import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button displays correct text', () => {
	const component = renderer.create(<Button>Test</Button>);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
