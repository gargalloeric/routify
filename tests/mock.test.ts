import { afterEach, describe, expect, it, vi } from 'vitest'



function product(a, b) {
    return a*b;
}

const mock = vi.fn().mockImplementation(product);
function sum(a, b, c, d){
    return mock(a, b) + mock(c, d);
}

describe('sum', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })


    it('should get with a mock', () => {

        expect(sum(1, 2,3,4)).toBe(14);
        expect(mock).toHaveBeenCalledTimes(2);

        mock.mockImplementationOnce(() => 'access-restricted')
        expect(mock()).toEqual('access-restricted')

        expect(mock).toHaveBeenCalledTimes(3)

        expect(sum(3, 2, 5, 6)).toBe(36);
        expect(mock).toHaveBeenCalledTimes(5)
    })
})