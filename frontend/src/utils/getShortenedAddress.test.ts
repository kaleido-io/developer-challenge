import getShortenedAddress from "./getShortenedAddress";
/** Test strings. Key is input, value is expected output */
const testStrings = {
    '0xEJZlqwr336Nx0TyLJQX9N8Wy3MFt7W01ezuWikCk': '0xEJZlqw...uWikCk',
    '0x123456...987654': '0x123456...987654',
    '': '...',
    '123': '123...123'
}
/**
 * Test getShortenedAddress()
 */
it('should return first 8 and last 6 characters of a string, separated by 3 dots', () => {
    for (const [key, value] of Object.entries(testStrings)) {
        expect(getShortenedAddress(key)).toEqual(value)
    }
});