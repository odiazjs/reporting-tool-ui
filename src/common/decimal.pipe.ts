import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'decimal' } )
export class DecimalPipe implements PipeTransform {
    transform ( value: any, args: string[] ): any {
        // const parsedVal = parseFloat( value );
        // if ( isNaN( parsedVal ) ) {
        //     return value;
        // } else {
        //     if ( typeof parsedVal.toFixed === 'function' ) {
        //         return parsedVal.toFixed(2);
        //     }
        // }
        const pad = (num) => {
            return ("0" + num).slice(-2);
        };

        const toMins = (secs) => {
            console.log(secs);
          let minutes = Math.floor(secs / 60);
          secs = secs % 60;
          const hours = Math.floor(minutes / 60);
          minutes = minutes % 60;
          return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
        };

        const parsedVal = parseInt(value, 0);

        if (isNaN(parsedVal)) {
            return value;
        }

        return toMins(value);
    }
}
