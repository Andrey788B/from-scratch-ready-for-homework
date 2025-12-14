export function toBeShorterThan(received: unknown, len: number): jest.CustomMatcherResult {
    if (typeof received !== 'string') {
        throw Error('Проверяемое значение должно быть строкой');
    }

    const pass = received.length <= len;

    return {
        pass,
        message: pass
            ? () => `Длина строки меньше или равна ${len}`
            : () => `Длина строки больше ${len}`
    }
}
