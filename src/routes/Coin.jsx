import {Route, Routes, useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Price from './Price';

const Container = styled.div`
    padding: 0 20px;
    margin: 0 auto;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Title = styled.h1`
    font-size: 48px;
    color: #3355aa;
    text-transform: uppercase;
    text-align: center;
    font-weight: 900;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 30px;
    border-radius: 15px;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
`;

const OverviewBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    // &:first-child -> 어떠한 태그인지는 모르겠지만, 첫 번째 자식에게 CSS 적용
    // div:first-child -> div 태그 첫번째 자식에게 CSS 적용

    div:first-child {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    // div:last-child -> div 태그 마지막 자식에게 CSS 적용

    div:last-child {
        text-transform: uppercase;
    }
`;

// 짝수(홀수-odd)번째 자식에게 태그 적용
// &:nth-child(even){}

const Description = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 30px;
    line-height: 1.5;
    font-size: 14px;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 4%;
`;

const Tab = styled(Link)`
    width: 48%;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    background-color: #aaa;
    text-decoration: none;
    color: inherit;
`;

function Coin() {
    // 1. loading 대한 state
    // 2. API에서 데이터를 받아옴
    // 3. 받아온 데이터를 저장할 coin state

    // 받아와야 하는 API 주소 : https://api.coingecko.com/api/v3/coins/${id}
    // fetch 할 때 headers에 "x-cg-demo-api-key": "CG-MDneMBZNacbsPHWDSnvpJUHB"

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState({});

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
            headers: {
                'x-cg-demo-api-key': 'CG-MDneMBZNacbsPHWDSnvpJUHB',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setCoin(data);
            setLoading(false);
        });
    }, [id]);

    return (
            <Container>
                {/* 논리합 || : 좌측의 값이 true이면 왼쪽을 출력, 값이 없거나 false라면 오른쪽을 출력 */}
                <Title>{id || 'Loading...'}</Title>
                {loading ? (
                        <Loader>Loading...</Loader>
                ) : (
                        <>
                            <Overview>
                                <OverviewBox>
                                    <div>HASHING</div>
                                    <div>{coin?.hashing_algorithm}</div>
                                </OverviewBox>
                                <OverviewBox>
                                    <div>SYMBOL</div>
                                    <div>{coin?.symbol}</div>
                                </OverviewBox>
                                <OverviewBox>
                                    <div>Genesis Date</div>
                                    <div>{coin?.genesis_date}</div>
                                </OverviewBox>
                            </Overview>
                            <Description>{coin?.description?.en}</Description>
                            <Overview>
                                <OverviewBox>
                                    <div>Total Supply</div>
                                    <div>{coin?.market_data?.total_supply}</div>
                                </OverviewBox>
                                <OverviewBox>
                                    <div>High Price</div>
                                    <div>{coin?.market_data?.high_24h?.usd}</div>
                                </OverviewBox>
                                <OverviewBox>
                                    <div>Low Price</div>
                                    <div>{coin?.market_data?.low_24h?.usd}</div>
                                </OverviewBox>
                                <OverviewBox>
                                    <div>Current Price</div>
                                    <div>{coin?.market_data?.current_price?.usd}</div>
                                </OverviewBox>
                            </Overview>
                            <Tabs>
                                {/*<Tab to={`/coin/${id}/chart`}>Chart</Tab>*/}
                                <Tab to={`/coin/${id}/price`}>Price</Tab>
                            </Tabs>
                            <Routes>
                                {/*<Route path={"/chart"} element={<Chart />} />*/}
                                <Route path={"/price"} element={<Price coin={coin} />} />
                            </Routes>
                        </>
                )}
            </Container>
    );
}

export default Coin;