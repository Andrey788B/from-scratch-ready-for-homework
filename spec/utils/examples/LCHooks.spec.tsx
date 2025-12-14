describe.skip('Хуки жизненного цикла', () => {
    beforeAll(() => console.log('1 - beforeAll'));
    beforeEach(() => console.log('1 - beforeEach'));
    
    test('', () => console.log('1 - test'));
    
    afterEach(() => console.log('1 - afterEach'));
    afterAll(() => console.log('1 - afterAll'));
    
    
    describe('', () => {
        beforeAll(() => console.log('2 - beforeAll'));
        beforeEach(() => console.log('2 - beforeEach'));
    
        test('', () => console.log('2 - test'))
    
        afterEach(() => console.log('2 - afterEach'));
        afterAll(() => console.log('2 - afterAll'));
    })
});