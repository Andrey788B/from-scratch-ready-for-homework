export function toHaveDoneItem(received: { done: boolean }): jest.CustomMatcherResult {

    if (typeof received !== 'object') {
        throw Error('Проверяемый элемент должен быть объектом');
    }

    const pass = received.done === true;

    return {
        pass,
        message: () => pass
            ? 'Пример выполненной задачи есть в списке'
            : 'Примера выполненной задачи нет в списке'
    }
}