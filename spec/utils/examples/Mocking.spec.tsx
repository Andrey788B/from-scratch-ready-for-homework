import { sayHi } from "src/utils/helpers";

describe.skip("Мокирование", () => {

    it("Мокируем функции", () => {
        const fn = jest.spyOn(console, 'error');
        fn.mockImplementation(() => 42);
    
        console.error('Ошибка!');
    
        expect(fn).toBeCalledWith('Ошибка!');
        expect(fn).toReturnWith(42);
    });
    
    it("Мокируем модули", () => {
        sayHi();
        expect(sayHi).toReturnWith('Привет!')
    });
    
    it("Мокируем поля объекта", () => {
        const obj = {
            name: 'header',
            value: 'Greetings!'
        };
    
        jest.replaceProperty(obj, 'value', 'hello');
        expect(obj.value).toBe('hello');
    });
    
    it("Мокируем таймеры", async () => {
        const fn = jest.fn(console.log);
    
        const runTimer = () => {
            setTimeout(() => {
                fn('Таймер выполнился');
                runTimer();
            }, 3000);
    
            runTimer();
            jest.runOnlyPendingTimers();
            
            expect(fn).toBeCalled();
        }
    });
});
