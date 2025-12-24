export class DeRomano {
    static readonly ROMAN_DECIMAL_MAP: Map<string, number> = new Map([
        ["I", 1],
        ["IV", 4],
        ["V", 5],
        ["IX", 9],
        ["X", 10],
        ["XL", 40],
        ["L", 50],
        ["XC", 90],
        ["C", 100],
        ["CD", 400],
        ["D", 500],
        ["CM", 900],
        ["M", 1000],
        ["_I", 1000],
        ["_I_V", 4000],
        ["_V", 5000],
        ["_I_X", 9000],
        ["_X", 10000],
        ["_X_L", 40000],
        ["_L", 50000],
        ["_X_C", 90000],
        ["_C", 100000],
        ["_C_D", 400000],
        ["_D", 500000],
        ["_C_M", 900000],
        ["_M", 1000000]
    ]);

    static paraDecimal(algarismos: string): number {
        let total = 0;
        let indiceCaractereAtual = 0;
        while (indiceCaractereAtual < algarismos.length) {
          let vinculumPair: boolean = algarismos.charAt(indiceCaractereAtual) === '_'
            && indiceCaractereAtual + 3 < algarismos.length
            && algarismos.charAt(indiceCaractereAtual + 2) === '_'
            && ROMAN_DECIMAL_MAP.has(algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 4));
          let vinculumSingle__NormalPair: boolean = algarismos.charAt(indiceCaractereAtual) == '_'
            || indiceCaractereAtual + 1 < algarismos.length
            && ROMAN_DECIMAL_MAP.has(algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 2));
    
          let key: string = vinculumPair
            ? algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 4)
            : vinculumSingle__NormalPair
              ? algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 2)
              : algarismos.substring(indiceCaractereAtual, indiceCaractereAtual + 1);
    
          indiceCaractereAtual += key.length;
          total += ROMAN_DECIMAL_MAP.get(key)!;
        }
        return total;
    }
}
