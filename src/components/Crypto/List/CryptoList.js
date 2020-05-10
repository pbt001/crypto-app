import React from "react";
import styled from "styled-components";
import { default as Element } from "./CryptoBasicElement";
import loadingSVG from '../../../assets/loading.svg'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
`;

const Loading = styled.div`
  min-height: 100%;
  grid-column: 1 / 5;
  display: grid;
`;

const Image = styled.img`
  align-self: center;
  justify-self: center;
`;

class CryptoList extends React.Component {

    renderElement(item) {
        return (
            <Element key={item.rank} item={item}/>
        );
    };

    render() {
        let { items } = this.props;

        return (
            items.length > 0 ? (
                <Wrapper>
                    {items.map(this.renderElement)}
                </Wrapper>
            ) : (
                <Loading>
                    <Image src={loadingSVG} alt={"Loading"}/>
                </Loading>
            )
        );
    }
}

export default CryptoList

