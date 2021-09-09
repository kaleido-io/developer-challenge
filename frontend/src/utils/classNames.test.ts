import { classNames } from "./classNames";
/**
 * Test classnames()
 */
describe('classNames()', () => {
    it('should combine multiple strings into one string', () => {
        expect(classNames()).toEqual('')
        expect(classNames('')).toEqual('')
        expect(classNames('ABC')).toEqual('ABC')
        expect(classNames('ABC', 'DEF', 'GHI')).toEqual('ABC DEF GHI')
    });
})