import '../miniUi.css';

import { useState } from "react";

export default function MiniUI() {
    const [active, setActive] = useState(true);

    return (
        <form className="w-full">
            <div className="mr-auto  flex flex-col gap-2">
                <fieldset>
                    <legend>Textual</legend>
                    <label>
                        Text
                        <input type="text" minLength={0} maxLength={2} />
                    </label>
                    <label>
                        <input type="search" minLength={0} />
                    </label>
                    <label>
                        Tel
                        <input type="tel"
                            placeholder="(00) 00000-0000"
                            pattern="^(\+\d{2,3}\s?)?(\(\d{2}\)|\d{2})?\s?\d{4,5}-?\d{4}$"
                            minLength={0} />
                    </label>
                    <label>
                        Password
                        <input type="password" minLength={0} />
                    </label>
                    <label>
                        Number
                        <input type="number" min={0} max={2} step={-0.1} />
                    </label>
                    <label>
                        Email
                        <input type="email" minLength={0} />
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <input type="checkbox" checked={active} onChange={ev => setActive(ev.target.checked)} />
                        Checkbox
                    </label>
                    <label>
                        <input type="radio" checked={active} onChange={ev => setActive(ev.target.checked)} />
                        Radio
                    </label>
                    <label>
                        Color
                        <input type="color" />
                    </label>
                    <label>
                        Date
                        <input type="date" max="9999-12-31" min="1000-01-01" onChange={ev => console.log(ev.target.value)} />
                    </label>
                    <label>
                        Datetime Local
                        <input type="datetime-local" max="9999-12-31" min="1000-01-01" onChange={ev => console.log(ev.target.value)} />
                    </label>
                    <label>
                        Month
                        <input type="month" max="9999-12" min="1000-01" onChange={ev => console.log(ev.target.value)} />
                    </label>
                    <label>
                        Week
                        <input type="week" max="9999-W50" min="1000-W01" onChange={ev => console.log(ev.target.value)} />
                    </label>
                    <label>
                        Time
                        <input type="time" onChange={ev => console.log(ev.target.value)} />
                    </label>
                    <label>
                        File
                        <input type="file" accept="image/*" />
                    </label>
                    <label>
                        Image
                        <input type="file" accept="image/*" />
                    </label>

                    <fieldset>

                        <legend>Buttons</legend>
                        <label>
                            <input type="button" value="button" />
                        </label>
                        <label>
                            <input type="submit" />
                        </label>
                        <label>
                            <input type="reset" />
                        </label>
                    </fieldset>
                </fieldset>
            </div>
        </form>
    );
}