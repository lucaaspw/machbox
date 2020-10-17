import React, { Component } from 'react';
import Logo from '../image/logo.png';
import '../content/style.css';
import api from '../services/matchboxbrasil.json';

class Ranking extends Component {

    state = {
        ranking: [],
    }

    componentDidMount() {
        const response = api;

        const total = response.data.reduce((total, current) => {
            if (current.positive) {
                return total + current.positive;
            }
            return total;
        }, 0);

        const ranking = response.data
            
            .map((item) => {
                if (item.positive) {
                    item.positive_percent = Math.ceil((item.positive * 100) / total);
                } else {
                    item.positive_percent = 0;
                }

                if (item.negative) {
                    item.negative_percent = Math.ceil((item.negative * 100) / total);
                } else {
                    item.negative_percent = 0;
                }

                return item;
            });
            
            ranking.sort(function(a, b){
                if(a.positive < b.positive){
                    return 1
                }
                if(a.positive > b.positive){
                    return -1
                }
                else{
                    return 0
                }
            })
                

        this.setState({ ranking });
    }


    render() {
        const { ranking } = this.state;
        return (
            <div className="container">
                <div className="content">
                    <img src={Logo} alt="Logo Matchbox" />
                    <div className="ranking">
                        <h1>ranking</h1>
                    </div>
                    {ranking.map((item, i) => (
                        <div className="podios-ranking" key={item.__id}>
                            <div className="box-image">
                                <img src={item.picture} alt={item.name} />
                                <span>{i += 1}</span>
                            </div>
                            <div className="description">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className="status">
                                <div className="seta"></div>
                                <div className="positive">
                                    <h5>Gostam</h5>
                                    <div className="porcent">{item.positive_percent}%</div>
                                </div>
                                <div className="negative">
                                    <h5>Não Gostam</h5>
                                    <div className="porcent">{item.negative_percent}%</div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export default Ranking;
