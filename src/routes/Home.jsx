import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router';

// styled 컴포넌트들을 함수 외부로 이동
const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 480px;
`;

const Header = styled.header`
    height: 15dvh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: #aa3388;
    text-shadow: 5px 6px 4px rgba(0, 0, 0, 0.3);
    animation: spinAndPulse 3s ease-in-out infinite;

    @keyframes spinAndPulse {
        0% {
            transform: rotate(0deg) scale(10);
            opacity: 1;
        }
        25% {
            transform: rotate(180deg) scale(7.5);
            opacity: 0.3;
        }
        50% {
            transform: rotate(360deg) scale(8);
            opacity: 1;
        }
        75% {
            transform: rotate(540deg) scale(9.3);
            opacity: 0.8;
        }
        100% {
            transform: rotate(90deg) scale(10);
            opacity: 1;
        }
    }
`;

const Loader = styled.div`
    text-align: center;
    font-size: 24px;
`;

const CoinList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
`;

const CoinItem = styled.li`
    border-radius: 15px;
    padding: 15px;
    border: 1px solid #aa3388;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 25px;
    background: linear-gradient(90deg, #ff76ff 0%, #dce2e3 100%);
    animation: flyIn 0.6s ease-out forwards;
    opacity: 0;
    transform: translateX(-100vw);

    @keyframes flyIn {
        0% {
            transform: translateX(-100vw) rotate(-180deg);
            opacity: 0;
        }
        60% {
            transform: translateX(20px) rotate(10deg);
            opacity: 1;
        }
        100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    &:hover {
        background-color: #916b6b;
        color: #8f6f6f;
    }
`;

const Symbol = styled.span`
    text-transform: uppercase;
`;

const Img = styled.img`
    height: 25px;
`;

function Home() {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
                {
                    headers: {
                        'x-cg-demo-api-key': 'CG-MDneMBZNacbsPHWDSnvpJUHB',
                    },
                }).then(res => res.json()).then(data => {
            setList(data);
            setLoading(false);
        });
    }, []);

    return (
            <Container>
                <Header>
                    <Title>코인</Title>
                </Header>
                {loading
                        ? <Loader>Loading...</Loader>
                        : <CoinList>
                            {list.map((item, index) => {
                                return (
                                        <CoinItem key={index} style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}>
                                            <Link to={`/coin/${item.id}`}>
                                                <div>
                                                    [<Symbol>{item.symbol}</Symbol>] {item.name}
                                                </div>
                                                <div>
                                                    <Img src={item.image} alt={item.name}/>
                                                </div>
                                            </Link>
                                        </CoinItem>
                                );
                            })}
                        </CoinList>
                }
            </Container>
    );
}

export default Home;