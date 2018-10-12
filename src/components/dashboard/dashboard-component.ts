import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Dictionary } from 'src/components/types';

@Component( {
    selector: 'app-dashboard',
    templateUrl: './dashboard.template.html',
    styleUrls: [ './dashboard.component.scss' ]
} )
export class DashboardComponent implements AfterViewInit {

    totalTalkChart: AmChart;
    outboundTalkChart: AmChart;
    inboundTalkChart: AmChart;

    tableSet: { cols: string[], csvJson: Dictionary<CsvJson> } = {
        cols: [],
        csvJson: {}
    };

    dataSet: any[] = [];
    mapSet: Array<Dictionary<any>> = [];

    constructor (
        private zone: NgZone,
        private amChartService: AmChartsService
    ) { }

    ngAfterViewInit (): void {
        // csvtojson
    }

    convertFile () {
        this.mapSet = [];
        const input: any = document.getElementById( 'fileInput' );
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            this.dataSet = text.split( "\n" ).map( ( row ) => {
                return row
                    .split( "," )
                    .map( col => col.replace( /['"]+/g, '' ) );
            } );

            this.tableSet.cols = this.dataSet.shift();
            this.tableSet.cols = this.tableSet.cols.map(x => x.replace('(seconds)', '(hh:mm:ss)'));

            let dict: Dictionary<any> = {};

            this.dataSet = this.formatData(this.dataSet);

            this.dataSet.forEach( ( row, rowIndex ) => {
                    row.forEach( ( val, valIndex ) => {
                        dict = {};
                        this.tableSet.cols.forEach( ( col, colIndex ) => {
                            if ( !dict[ col ] ) {
                                dict[ col ] = row[ colIndex ];
                            }
                        } );
                    } );
                    this.mapSet.push( dict );
                } );
            this.buildCharts( this.mapSet );
        };
        reader.readAsText( input.files[ 0 ] );
    }

    sortSet (colNo) {
        const sorted = [...this.mapSet].sort((a, b) => {
            return b[this.tableSet.cols[colNo]] - a[this.tableSet.cols[colNo]];
        } );
        return sorted.splice(0, 10);
    }

    buildCharts ( mapSet: any[] ) {
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
        setTimeout( () => {
            const totalTalkChart = this.amChartService.makeChart( 'totalTalkTime', {
                'type': 'radar',
                'theme': 'none',
                'dataProvider': this.sortSet(4),
                'valueAxes': [ {
                    'axisTitleOffset': 10,
                    'minimum': 0,
                    'axisAlpha': 0.15
                }],
                'startDuration': 1,
                'graphs': [ {
                    'balloonText': '[[value]] mins.',
                    'bullet': 'round',
                    'lineThickness': 2,
                    'valueField': this.tableSet.cols[4]
                }],
                'categoryField': this.tableSet.cols[0],
                'export': {
                    'enabled': true
                }
            } );
            const outboundTalkChart = this.amChartService.makeChart( 'outboundTalkTime', {
                'type': 'radar',
                'theme': 'light',
                'dataProvider': this.sortSet(6),
                'valueAxes': [ {
                    'axisTitleOffset': 10,
                    'minimum': 0,
                    'axisAlpha': 0.15
                }],
                'startDuration': 1,
                'graphs': [ {
                    'balloonText': '[[value]] mins.',
                    'bullet': 'round',
                    'lineThickness': 2,
                    'valueField': this.tableSet.cols[6]
                }],
                'categoryField': this.tableSet.cols[0],
                'export': {
                    'enabled': true
                }
            } );
            const inboundTalkChart = this.amChartService.makeChart( 'inboundTalkTime', {
                'type': 'radar',
                'theme': 'patterns',
                'dataProvider': this.sortSet(5),
                'valueAxes': [ {
                    'axisTitleOffset': 10,
                    'minimum': 0,
                    'axisAlpha': 0.15
                }],
                'startDuration': 1,
                'graphs': [ {
                    'balloonText': '[[value]] mins.',
                    'bullet': 'round',
                    'lineThickness': 2,
                    'valueField': this.tableSet.cols[5]
                }],
                'categoryField': this.tableSet.cols[0],
                'export': {
                    'enabled': true
                }
            } );

            this.totalTalkChart = Object.assign( {}, totalTalkChart );
            this.outboundTalkChart = Object.assign( {}, outboundTalkChart );
            this.inboundTalkChart = Object.assign( {}, inboundTalkChart );
        } );
    }

    formatData ( mapSet ) {
        return mapSet
            .filter( x => {
                return Object.keys( x ).filter( item => x[ item ] ).length > 0;
            } );
    }
}

export interface CsvJson {
    col: string;
    values: any[];
}
