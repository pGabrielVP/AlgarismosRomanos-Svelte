export class DeRomano {
    static readonly ROMAN_DECIMAL_MAP: Map<string, number> = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000],
        ['_I', 1000],
        ['_V', 5000],
        ['_X', 10000],
        ['_L', 50000],
        ['_C', 100000],
        ['_D', 500000],
        ['_M', 1000000]
    ]);

    static paraDecimal(algarismos: string): number {
        let total = 0;
        for (let i = 0; i < algarismos.length; i++) {
            if (
                algarismos.charAt(i) === '_' &&
                i + 3 < algarismos.length &&
                algarismos.charAt(i + 2) === '_'
            ) {
                const pair = algarismos.charAt(i) + algarismos.charAt(i + 1);
                const lookaheadPair = algarismos.charAt(i + 2) + algarismos.charAt(i + 3);
                const currentValue = DeRomano.ROMAN_DECIMAL_MAP.get(pair) ?? 0;
                const nextValue = DeRomano.ROMAN_DECIMAL_MAP.get(lookaheadPair) ?? 0;
                if (nextValue > currentValue) {
                    total += nextValue - currentValue;
                    i = i + 3;
                } else {
                    total += currentValue;
                    i = i + 1;
                }
            } else if (algarismos.charAt(i) === '_') {
                const pair = algarismos.charAt(i) + algarismos.charAt(i + 1);
                const currentValue = DeRomano.ROMAN_DECIMAL_MAP.get(pair) ?? 0;
                total += currentValue;
                i = i + 1;
            } else {
                const currentValue = DeRomano.ROMAN_DECIMAL_MAP.get(algarismos.charAt(i)) ?? 0;
                const nextValue =
                    i + 1 < algarismos.length ? (DeRomano.ROMAN_DECIMAL_MAP.get(algarismos.charAt(i + 1)) ?? 0) : 0;
                if (nextValue > currentValue) {
                    total += nextValue - currentValue;
                    i++;
                } else {
                    total += currentValue;
                }
            }
        }
        return total;
    }
}