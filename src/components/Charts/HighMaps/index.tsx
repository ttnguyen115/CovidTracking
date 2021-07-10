import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import React, { FC, useEffect, useRef, useState } from 'react';
import { cloneDeep } from 'lodash';

highchartsMap(Highcharts);

interface Props {
    mapData: any;
}

interface OptionType {
    chart: { height: string; };

    title: { text: string | null; };

    mapNavigation: { enabled: boolean; };

    colorAxis: { min: number; stops: (string | number)[][]; };

    legend: { layout: string; align: string; verticalAlign: string; };

    series: [{ name: string; joinBy: string[]; }];
}

const initOptions: OptionType = {
    chart: {
      height: '500',
    },

    title: {
      text: null,
    },

    mapNavigation: {
      enabled: true,
    },

    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '#7A0826'],
        ],
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
    },

    series: [
        {
            name: 'Population',
            joinBy: ['hc-key', 'key'],
        },
    ],
}

const HighMaps: FC<Props> = ({ mapData = [] }) => {
    const [options, setOptions] = useState<any>({});
    const chartRef = useRef<any>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            console.log(mapData);
            const fakeData = mapData.features.map((feature: any, index: number) => ({
                key: feature.properties['hc-key'],
                value: index
            }));
    
            setOptions({
                ...initOptions,
                title: { text: mapData.title },
                series: [
                    { ...initOptions.series[0], mapData, data: fakeData },
                ],
            })

            if (!loaded) setLoaded(true);
        }
    }, [mapData, loaded]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0]?.update({
                mapData,
            })
        }

    }, [mapData]);


    return (
        <HighchartsReact 
            highcharts={Highcharts}
            options={cloneDeep(options)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    )
}

export default React.memo(HighMaps);
