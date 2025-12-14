import { render, screen } from '@testing-library/react';
import { Input } from 'src/components/Input';

it.skip('Работаем с dom', () => {
    const fn = jest.fn();
    const view = render(<Input value="Hi!" onChange={fn} />);

    const containerEl = screen.getByTestId('input-container');
    const inputEl = screen.getByRole('textbox');
    const hintEl = screen.getByTestId('input-hint-text');

    inputEl.focus();

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toBeVisible();
    expect(inputEl).toBeEnabled();
    expect(inputEl).toHaveFocus();

    expect(hintEl).toBeEmptyDOMElement();
    expect(inputEl).toHaveAttribute('title', 'поле для заголовка');
    expect(inputEl).toHaveClass(
        'input-field-element input-field-node', { exact: true }
    );

    expect(inputEl).toHaveStyle(`
        display: flex;
    `);

    expect(containerEl).toContainElement(inputEl);

    expect(inputEl).toHaveValue('Hi!');
    expect(inputEl).toHaveDisplayValue('Hi!');

});
