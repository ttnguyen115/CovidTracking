import Highchart from 'highcharts'
import HightcharsReact from 'highcharts-react-official'
import React, { FC, useEffect, useState } from 'react'
import { CountryData } from '../../../App';
import moment from 'moment'
import { ButtonGroup, Button } from '@material-ui/core';

interface Props {
    data: Array<CountryData>;
}

interface Options {
    chart: { height: number; };

    title: { text: string; };

    xAxis: { categories: string[]; crosshair: boolean; };

    color: Array<string>;

    yAxis: { min: number; title: { text: string | null; }; labels: { align: string; }; };

    tooltip: { headerFormat: string; pointFormat: string; footerFormat: string; shared: boolean; useHTML: boolean; };

    plotOptions: { column: { pointPadding: number; borderWidth: number; }; };

    series: Array<{ name: string; data: any }>;
}

const generateOptions = (data: Array<CountryData>): Options => {
    const categories = data.map((item: CountryData): string => moment(item.Date).format('DD/MM/YYYY'));

    return {
        chart: {
            height: 500
        },

        title: {
            text: 'Total Cases'
        },

        xAxis: {
            categories: categories,
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

const LineChart: FC<Props> = ({ data }) => {
    const [options, setOptions] = useState({});
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        let customData: Array<CountryData> = [];

        switch (filter) {
            case 'all':
                customData = data;
                break;
        
            case '30':
                customData = data.slice(data.length - 30);
                break;
            
            case '7':
                customData = data.slice(data.length - 7);
                break;

            default:
                customData = data;
                break;
        }

        setOptions(generateOptions(customData));
    }, [data, filter]);

    return (
        <div>
            <ButtonGroup size="small" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color={filter === 'all' ? 'secondary' : undefined} onClick={() => setFilter('all')} >All</Button>
                <Button color={filter === '30' ? 'secondary' : undefined} onClick={() => setFilter('30')} >30 days ago</Button>
                <Button color={filter === '7' ? 'secondary' : undefined} onClick={() => setFilter('7')} >7 days ago</Button>
            </ButtonGroup>

            <HightcharsReact highcharts={Highchart} options={options} />
        </div>
    )
}

export default React.memo(LineChart);
