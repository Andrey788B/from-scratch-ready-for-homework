## Обычный тест состоит из 5 основных частей

- Подготовка тест-сьюта (опционально)
- Виртуальный рендер компонента
- Поиск элемента
- Взаимодействие с элементом
- Проверка результата

```js
describe("Приложение Greetings!", () => {
  let fn;

  beforeAll(() => {
    fn = jest.fn();
  });

  test("Ввод произвольного текста", () => {
    const view = render(<App />);
    const input = view.getByTestId("user-input");

    fireEvent.change(input, { target: { value: "Привет!" } });

    expect(input.value).toBe("Привет!");
  });
});
```
