describe.skip("Assertions (expect)", () => {
    it('Строгое сравнение значений', () => {   
        expect(1).toBe(1);
        expect({}).toEqual({});
        expect({}).toStrictEqual({});
    });
    
    it('Проверка наличия значения', () => {
        expect('value').toBeDefined();
        expect(undefined).toBeUndefined();
        expect(NaN).toBeNaN();
        expect(null).toBeNull();
    });
    
    it('Булево сравнение', () => {
        expect('').toBeFalsy();
        expect('value').toBeTruthy();
    })
    
    it('Математические сравнения', () => {
        expect(1 + 2).toBeGreaterThan(2);
        expect(1 + 2).toBeGreaterThanOrEqual(3);
    
        expect(1 + 2).toBeLessThan(4);
        expect(1 + 2).toBeLessThanOrEqual(3);
    
        expect(0.1 + 0.2).toBeCloseTo(0.3);
    });
    
    it('Работа с функциями', () => {
        const fn = jest.fn(arg => arg);
    
        const arg1 = { value: 1 };
        const arg2 = 'greetings';
        
        fn(arg1);
        fn(arg1);
        fn(arg2);
    
        expect(fn).toHaveBeenCalled();
        expect(fn).toHaveBeenCalledTimes(3);
        expect(fn).toHaveBeenCalledWith(arg1);
    
        expect(fn).toHaveBeenLastCalledWith(arg2);
    
        expect(fn).toHaveReturned();
        expect(fn).toHaveReturnedTimes(3);
        
        expect(fn).toHaveReturnedWith(arg1);
        expect(fn).toHaveLastReturnedWith(arg2);
    
        expect(fn).toHaveBeenNthCalledWith(2, arg1);
        expect(fn).toHaveNthReturnedWith(2, arg1);
    });
    
    it('Работа с объектами', () => {
        const value = {
            name: 'objects',
            nested: {
                name: 'child'
            },
            items: ['child1', 'child2']
        };
    
        expect(value).toHaveProperty('nested.name');
    
        expect(value).toMatchObject({
            nested: {},
            items: ['child1', 'child2']
        })
    });
    
    it('Работаем с массивами', () => {
        const value: unknown[] = [{ name: 'a' }, { label: 'b' }];
    
        expect(value).toContainEqual({ label: 'b' });
        expect(value).toHaveLength(2);
    });
    
    it('Асимметричные мэтчеры', () => {
        const value = {
            name: 'Greetings!',
            label: 'header',
            items: ['item1', 'item2'],
            child: {
                name: 'Hi!',
                age: 10
            },
            amount: 0.1 + 0.2,
        };
    
        expect(value).toEqual({
            name: expect.stringMatching(/ee/i),
            label: expect.stringContaining('ea'),
            items: expect.arrayContaining(['item2']),
            child: expect.objectContaining({ age: expect.any(Number) }),
            amount: expect.closeTo(0.3),
        })
    });
    
    it('Работа с модификаторами', async () => {
        expect(1 + 2).not.toBe(4);
        expect('value').not.toBeFalsy();
    
        const promiseToResolve = Promise.resolve('Resolved!');
        const promiseToReject = Promise.reject(new Error('Rejected!'));
    
        await expect(promiseToResolve).resolves.toBe('Resolved!');
        await expect(promiseToReject).rejects.toThrow('Rejected!');
    })
})