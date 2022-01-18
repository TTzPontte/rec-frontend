import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 10px;
  margin: 10px;
  margin-top: 70px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  //grid-template-rows: 65px 1fr 80px;
  margin-bottom: 20px;

  > * {
    padding: 10px 10px 35px;
  }

  header {
    height: 50px;
    padding: 10px;
    padding-bottom: 0;
    margin-top: 5px;
    grid-column: 1/3;
    letter-spacing: 0px;
    color: #5c3b6b;
    font: normal normal 500 1.2em system-ui !important;
    letter-spacing: 0.2px !important;
  }

  .addFilePessoa {
    grid-column: 1/3;
    grid-row: 5/5;
    position: relative;

    button {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  .documentoPessoa {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  padding: 20px;
  border: 1px solid #e8e8ef;
  border-left: solid 4px #5c3b6b;
  border-radius: 5px;
`;


export const DivNovaPessoa = styled.div`
    float: right;
`;

export const DivModalNovaPessoa = styled.div`
    width: 100%;
    height: 190px;
    vertical-align: middle;    
`;

export const DivSpanNovaPessoa = styled.div`
    text-align: center;
    margin-top: 20px
`;

export const SpanNovaPessoa = styled.span`
    width: 207px;
    height: 38px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0px;
    color: #5C3B6B;
    opacity: 1;
`;

export const DivContentModalPF = styled.div`
    width: 648px;
    height: 480px;
`;

export const DivContentModalPJ = styled.div`
    width: 648px;
    height: 480px;
`;

export const DivModalTitulo = styled.div`
    width: 544px;
    height: 40px;
    margin-top: 10px;
    margin-left: 28px;
    font-size: 24px;
    font-weight: bold;
    color: #5C3B6B;
    opacity: 1;
`;

export const DivModalTexto = styled.div`
    width: 544px;
    height: 45px;
    margin-top: 24px;
    margin-left: 28px;
    font-size: 16px;
    color: #3B3349;
    opacity: 1;
`;

export const DivModalTextoTipoEnvolvimento = styled.div`
    width: 544px;
    height: 25px;
    margin-top: 24px;
    margin-left: 28px;
`;

export const DivModalSelectTipoEnvolvimento = styled.div`
    width: 544px;
    height: 45px;
    margin-left: 28px;
`;

export const DivModalTextoNome = styled.div`
    width: 544px;
    height: 25px;
    margin-left: 28px;
    margin-top: 24px;
`;

export const DivModalInputNome = styled.div`
    width: 544px;
    height: 40px;
    margin-left: 28px;
`;

export const DivModalTextoCPF = styled.div`
    width: 544px;
    height: 25px;
    margin-top: 24px;
    margin-left: 28px;
`;

export const DivModalInputCPF = styled.div`
    width: 648px;
    height: 40px;
    margin-left: 28px;
`;


