import {formatCurrency} from "../../scripts/utils/money.js";

describe('Test Suite: formatCurrency',()=>{
    it('converts cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95')
    });
    it('works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00')
    });
    it('Rounds up to nearest cent',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })
    it('Rounds down to nearest cent',()=>{
        expect(formatCurrency(2000.4)).toEqual('20.00')
    })
    it('Works with negative number',()=>{
        expect(formatCurrency(-500)).toEqual('-5.00')
    })
});