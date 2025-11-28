// import {useEffect, useState} from 'react';
// import {useParams} from 'react-router';
// import ApexChart from 'react-apexcharts';
//
// function Chart() {
//     const [loading, setLoading] = useState(true);
//     const [chartData, setChartData] = useState([]); // chart → chartData로 변경
//     const {id} = useParams();
//
//     useEffect(() => {
//         fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`,
//                 {
//                     headers: {
//                         'x-cg-demo-api-key': 'CG-MDneMBZNacbsPHWDSnvpJUHB',
//                     },
//                 }).then(res => res.json()).then(data => {
//             setChartData(data.prices); // data.price → data.prices
//             setLoading(false);
//         });
//     }, [id]);
//
//     return (
//             <div>
//                 {loading
//                         ? 'Loading...'
//                         : (<ApexChart
//                                 type={'line'}
//                                 series={[
//                                     {
//                                         name: "Price",
//                                         data: chartData.map((item) => {
//                                             return {x: item[0], y: item[1]};
//                                         })
//                                     }
//                                 ]}
//                                 options={{ // option → options, 기본 설정 추가
//                                     chart: {
//                                         type: 'line'
//                                     },
//                                     xaxis: {
//                                         type: 'datetime'
//                                         labels: {
//                                             show: true,
//
//                                         },
//                                     }
//                                 }}
//                         />)
//                 }
//             </div>
//     );
// }
//
// export default Chart;