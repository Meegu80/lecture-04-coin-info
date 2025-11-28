import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';

// 전역 스타일을 함수 외부로
const GlobalStyle = createGlobalStyle`
    body {
        background-color: #000000;
        margin: 0;
        padding: 0;
    }
`;

// 모든 styled 컴포넌트를 함수 외부로 이동
const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    padding: 20px;
    min-height: 100vh;
`;

const BackButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    background-color: #aa3388;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    margin-bottom: 20px;
    transition: all 0.3s;

    &:hover {
        background-color: #882266;
        transform: scale(1.05);
    }
`;

const CoinCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.6s ease-out;

    @keyframes slideUp {
        0% {
            transform: translateY(50px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const CoinImage = styled.img`
    width: 120px;
    height: 120px;
    display: block;
    margin: 0 auto 30px;
    animation: rotate 3s ease-in-out infinite;

    @keyframes rotate {
        0%, 100% {
            transform: rotate(0deg) scale(1);
        }
        50% {
            transform: rotate(360deg) scale(1.1);
        }
    }
`;

const Title = styled.h1`
    font-size: 36px;
    color: #aa3388;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoBox = styled.div`
    background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 15px;
    padding: 20px;
    margin: 15px 0;
    border-left: 5px solid #aa3388;
    transition: all 0.3s;

    &:hover {
        transform: translateX(10px);
        box-shadow: 0 5px 15px rgba(170, 51, 136, 0.3);
    }
`;

const Label = styled.span`
    font-weight: bold;
    color: #aa3388;
    font-size: 18px;
`;

const Value = styled.span`
    color: #333;
    font-size: 18px;
    margin-left: 10px;
`;

const Loader = styled.div`
    text-align: center;
    font-size: 24px;
    color: #ffffff;
    padding-top: 50px;
`;

function Coin() {
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState(null);
    const {id} = useParams();
    const exchangeRate = 1460;

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
            headers: {
                'x-cg-demo-api-key': 'CG-MDneMBZNacbsPHWDSnvpJUHB',
            },
        }).then(res => res.json()).then(data => {
            setCoin(data);
            setLoading(false);
        });
    }, [id]);

    return (
            <>
                <GlobalStyle/>
                <Container>
                    {loading ? (
                            <Loader>Loading...</Loader>
                    ) : (
                            <>
                                <BackButton to="/">← 뒤로 가기</BackButton>
                                <CoinCard>
                                    <CoinImage src={coin?.image?.large}
                                               alt={coin?.name}/>
                                    <Title>{coin?.name}</Title>

                                    <InfoBox>
                                        <Label>약칭:</Label>
                                        <Value>{coin?.symbol?.toUpperCase()}</Value>
                                    </InfoBox>

                                    <InfoBox>
                                        <Label>현재 가격:</Label>
                                        <Value>${coin?.market_data?.current_price?.usd?.toLocaleString()}</Value>
                                    </InfoBox>

                                    <InfoBox>
                                        <Label>한화 가격:</Label>
                                        <Value>
                                            {coin?.market_data?.current_price?.usd &&
                                            exchangeRate
                                                    ? (coin.market_data.current_price.usd *
                                                            exchangeRate).toLocaleString()
                                                    : '-'}
                                            원
                                        </Value>
                                    </InfoBox>
                                </CoinCard>
                            </>
                    )}
                </Container>
            </>
    );
}

export default Coin;