import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime
});

describe('Оповещение при вополнении задачи', () => {
    it.todo('появляется и содержит заголовок задачи', async () => {
        render(<App/>);
    

    const inputEl = screen.getByRole('tectbox')
    const addBtn = screen.getByAltText(/Добавить/i);

    await userEvent.type(inputEl, 'Моя задача');
    await userEvent.click(addBtn);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    await userEvent.click(checkbox);

    expect(screen.getByText(/Задача "Моя задача" выполнена/i)).toBeInTheDocument();
    });                
        
        
    it.todo('одновременно может отображаться только одно оповещение', async () => {;
        render(<App/>)

        const inputEl = screen.getByRole('textbox');
        const addBtnEl = screen.getByAltText(/Добавить/i);
        
        await userEvent.type(inputEl, 'Задача 1');
        await userEvent.click(addBtnEl);

        await userEvent.type(inputEl, 'Задача 2');
        await userEvent.click(addBtnEl);
        
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
        await userEvent.click(checkboxes[0]);
        expect(screen.getByText(/Задача "Задача 1" выполнена/i)).toBeInTheDocument();
        
        // сразу выполняем вторую: сообщение должно замениться
        await userEvent.click(checkboxes[1]);

        expect(screen.queryByText(/Задача "Задача 1" выполнена/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Задача "Задача 2" выполнена/i)).toBeInTheDocument();

        // таймер должен считаться от последнего уведомления
                act(() => {
                jest.advanceTimersByTime(1999);
                });
            expect(screen.getByText(/Задача "Вторая" завершена/i)).toBeInTheDocument();
                act(() => {
                jest.advanceTimersByTime(1);
                });
            expect(screen.queryByText(/Задача "Вторая" завершена/i)).not.toBeInTheDocument();
        });
});