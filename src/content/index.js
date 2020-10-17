import React, { Component } from 'react';
import Logo from '../image/logo.png';
import '../content/style.scss';
import api from '../services/matchboxbrasil.json';

class Ranking extends Component {

    state = {
        ranking: [],
    }

    async componentDidMount() {
        const response = await api;
        this.setState({ ranking: response.data });
    }
    

    render() {
        const { ranking } = this.state;
        function sortfunction(a, b){
            return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
          }
          ranking.map((rank) =>{
              
              console.log(rank.positive);
            })
          
        return (
            <div className="container">
                <div className="content">
                    <img src={Logo} alt="Logo Matchbox" />
                    <div className="ranking">
                        <h1>ranking</h1>
                    </div>
                    {ranking.map((item, i = 1) => (
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
                                    <div className="porcent">{ item.positive / 100 }%</div>
                                </div>
                                <div className="negative">
                                    <h5>Não Gostam</h5>
                                    <div className="porcent">{ item.negative / 100 }%</div>
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