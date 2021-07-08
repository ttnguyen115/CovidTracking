import Highchart from 'highcharts'
import HightcharsReact from 'highcharts-react-official'
import React, { FC, useEffect, useState } from 'react'

interface Options {
    chart: { height: number; };

    title: { text: string; };

    xAxis: { categories: any; crosshair: boolean; };

    color: Array<string>;

    yAxis: { min: number; title: { text: string | null; }; labels: { align: string; }; };

    tooltip: { headerFormat: string; pointFormat: string; footerFormat: string; shared: boolean; useHTML: boolean; };

    plotOptions: { column: { pointPadding: number; borderWidth: number; }; };

    series: Array<{ name: string; data: any }>;
}

const generateOptions = (data: any): Options => {
    return {
        chart: {
            height: 500
        },

        title: {
            text: 'Total Cases'
        },

        xAxis: {
            categories: '',
            crosshair: true,
        },

        color: ['#f3585b'],

        yAxis: {
            min: 0,
            
            title: {
                text: null
            },

            labels: {
                align: 'right'
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
              '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },

        series: [
            {
              name: 'Tổng Ca nhiễm',
              data: data.map((item: any) => item.Confirmed),
            },
        ],
    }
}

const LineChart: FC<any> = ({ data }) => {
    const [options, setOptions] = useState({});

    useEffect(() => {
        setOptions(generateOptions(data));

    }, [data]);

    return (
        <div>
            <HightcharsReact
                highcharts={Highchart}
                options={options}
            />
        </div>
    )
}

export default LineChart
