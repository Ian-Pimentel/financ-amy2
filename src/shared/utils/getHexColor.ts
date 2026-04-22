import uniqolor from "uniqolor";

type UniqolorOptions = Parameters<typeof uniqolor>[1];

export default function getStrongHexColor(value?: string | number) {
    const options: UniqolorOptions = { format: "hex", lightness: 50, saturation: 100 };
    if (value)
        return uniqolor(value, options);
    return uniqolor.random(options);
}